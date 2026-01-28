// 'use server'

// import bcrypt from 'bcryptjs'
// import { auth, signIn, signOut } from '@/auth'
// import { IUserName, IUserSignIn, IUserSignUp } from '@/types'
// import { redirect } from 'next/navigation'
// import { PasswordResetRequestSchema, PasswordResetSchema, UserSignUpSchema, UserUpdateSchema } from '../validator'
// import { connectToDatabase } from '../db'
// import { formatError } from '../utils'
// import User, { IUser } from '../db/models/user.model'
// import { revalidatePath } from 'next/cache'
// import { PAGE_SIZE } from '../constants'
// import { z } from 'zod'
// import { v4 as uuidv4 } from 'uuid'
// import { EmailService } from '@/emails/email-service'

// // In-memory store for reset tokens (use Redis in production)
// const passwordResetTokens = new Map()

// type FormState = {
//   message: string;
//   success: boolean;
//   errors?: {
//     email?: string[];
//     password?: string[];
//     confirmPassword?: string[];
//     token?: string[];
//   } | null;
// }

// export async function updateUser(user: z.infer<typeof UserUpdateSchema>) {
//   try {
//     await connectToDatabase()
//     const dbUser = await User.findById(user._id)
//     if (!dbUser) throw new Error('User not found')
//     dbUser.name = user.name
//     dbUser.email = user.email
//     dbUser.role = user.role
//     const updatedUser = await dbUser.save()
//     revalidatePath('/admin/users')
//     return {
//       success: true,
//       message: 'User updated successfully',
//       data: JSON.parse(JSON.stringify(updatedUser)),
//     }
//   } catch (error) {
//     return { success: false, message: formatError(error) }
//   }
// }

// export async function getUserById(userId: string) {
//   await connectToDatabase()
//   const user = await User.findById(userId)
//   if (!user) throw new Error('User not found')
//   return JSON.parse(JSON.stringify(user)) as IUser
// }

// // DELETE

// export async function deleteUser(id: string) {
//   try {
//     await connectToDatabase()
//     const res = await User.findByIdAndDelete(id)
//     if (!res) throw new Error('Use not found')
//     revalidatePath('/admin/users')
//     return {
//       success: true,
//       message: 'User deleted successfully',
//     }
//   } catch (error) {
//     return { success: false, message: formatError(error) }
//   }
// }

// // GET
// export async function getAllUsers({
//   limit,
//   page,
// }: {
//   limit?: number
//   page: number
// }) {
//   limit = limit || PAGE_SIZE
//   await connectToDatabase()

//   const skipAmount = (Number(page) - 1) * limit
//   const users = await User.find()
//     .sort({ createdAt: 'desc' })
//     .skip(skipAmount)
//     .limit(limit)
//   const usersCount = await User.countDocuments()
//   return {
//     data: JSON.parse(JSON.stringify(users)) as IUser[],
//     totalPages: Math.ceil(usersCount / limit),
//   }
// }

// export async function signInWithCredentials(user: IUserSignIn) {
//   return await signIn('credentials', { ...user, redirect: false })
// }
// export const SignOut = async () => {
//   const redirectTo = await signOut({ redirect: false })
//   redirect(redirectTo.redirect)
// }
// export const SignInWithGoogle = async () => {
//   await signIn('google')
// }

// // CREATE
// export async function registerUser(userSignUp: IUserSignUp) {
//   try {
//     const user = await UserSignUpSchema.parseAsync({
//       name: userSignUp.name,
//       email: userSignUp.email,
//       password: userSignUp.password,
//       confirmPassword: userSignUp.confirmPassword,
//     })

//     await connectToDatabase()
//     await User.create({
//       ...user,
//       password: await bcrypt.hash(user.password, 5),
//     })
//     return { success: true, message: 'User created successfully' }
//   } catch (error) {
//     return { success: false, error: formatError(error) }
//   }
// }

// // UPDATE
// export async function updateUserName(user: IUserName) {
//   try {
//     await connectToDatabase()
//     const session = await auth()
//     const currentUser = await User.findById(session?.user?.id)
//     if (!currentUser) throw new Error('User not found')
//     currentUser.name = user.name
//     const updatedUser = await currentUser.save()
//     return {
//       success: true,
//       message: 'User updated successfully',
//       data: JSON.parse(JSON.stringify(updatedUser)),
//     }
//   } catch (error) {
//     return { success: false, message: formatError(error) }
//   }
// }

// // PASSWORD RESET FUNCTIONS

// export async function requestPasswordReset(prevState: FormState, formData: FormData) {
//   try {
//     const validatedFields = PasswordResetRequestSchema.safeParse({
//       email: formData.get('email'),
//     })

//     if (!validatedFields.success) {
//       return {
//         message: 'Invalid email address',
//         success: false,
//         errors: validatedFields.error.flatten().fieldErrors,
//       }
//     }

//     const { email } = validatedFields.data

//     await connectToDatabase()
    
//     // Check if user exists
//     const user = await User.findOne({ email: email.toLowerCase() })
//     if (!user) {
//       // Don't reveal whether email exists or not for security
//       return {
//         message: 'If an account with that email exists, we have sent a reset link.',
//         success: true,
//         errors: null,
//       }
//     }

//     // Generate reset token
//     const resetToken = uuidv4()
//     const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

//     // Store token (in production, use Redis or add to user document)
//     passwordResetTokens.set(resetToken, {
//       userId: user._id.toString(),
//       email: user.email,
//       expiresAt,
//     })

//     // Send reset email using EmailService
//     const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
    
//     const emailResult = await EmailService.sendPasswordResetEmail({
//       email,
//       resetLink,
//       appName: process.env.APP_NAME || 'Zando-kin'
//     })

//     if (!emailResult.success) {
//       console.error('Failed to send password reset email:', emailResult.error)
//       // Continue anyway to not reveal if email exists
//     }

//     return {
//       message: 'If an account with that email exists, we have sent a reset link.',
//       success: true,
//       errors: null,
//     }
//   } catch (error) {
//     console.error('Password reset request error:', error)
//     return {
//       message: 'An error occurred while processing your request.',
//       success: false,
//       errors: null,
//     }
//   }
// }

// export async function resetPassword(prevState: FormState, formData: FormData) {
//   try {
//     const validatedFields = PasswordResetSchema.safeParse({
//       token: formData.get('token'),
//       password: formData.get('password'),
//       confirmPassword: formData.get('confirmPassword'),
//     })

//     if (!validatedFields.success) {
//       return {
//         message: 'Invalid form data',
//         success: false,
//         errors: validatedFields.error.flatten().fieldErrors,
//       }
//     }

//     const { token, password } = validatedFields.data

//     // Verify reset token
//     const resetData = passwordResetTokens.get(token)
//     if (!resetData) {
//       return {
//         message: 'Invalid or expired reset token',
//         success: false,
//         errors: null,
//       }
//     }

//     if (new Date() > resetData.expiresAt) {
//       passwordResetTokens.delete(token)
//       return {
//         message: 'Reset token has expired',
//         success: false,
//         errors: null,
//       }
//     }

//     await connectToDatabase()

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(password, 12)

//     // Update user password
//     const updatedUser = await User.findByIdAndUpdate(
//       resetData.userId,
//       { password: hashedPassword },
//       { new: true }
//     )

//     if (!updatedUser) {
//       return {
//         message: 'User not found',
//         success: false,
//         errors: null,
//       }
//     }

//     // Delete used token
//     passwordResetTokens.delete(token)

//     // Send confirmation email using EmailService
//     const emailResult = await EmailService.sendPasswordResetConfirmationEmail({
//       email: resetData.email,
//       appName: process.env.APP_NAME || 'Zando-kin'
//     })

//     if (!emailResult.success) {
//       console.error('Failed to send password reset confirmation email:', emailResult.error)
//       // Continue anyway - password was still reset
//     }

//     return {
//       message: 'Password reset successfully!',
//       success: true,
//       errors: null,
//     }
//   } catch (error) {
//     console.error('Password reset error:', error)
//     return {
//       message: 'An error occurred while resetting your password.',
//       success: false,
//       errors: null,
//     }
//   }
// }

// // Verify reset token (for page validation)
// export async function verifyResetToken(token: string) {
//   const resetData = passwordResetTokens.get(token)
  
//   if (!resetData) {
//     return { valid: false, message: 'Invalid reset token' }
//   }

//   if (new Date() > resetData.expiresAt) {
//     passwordResetTokens.delete(token)
//     return { valid: false, message: 'Reset token has expired' }
//   }

//   return { valid: true, email: resetData.email }
// }


'use server'

import bcrypt from 'bcryptjs'
import { auth, signIn, signOut } from '@/auth'
import { IUserName, IUserSignIn, IUserSignUp } from '@/types'
import { redirect } from 'next/navigation'
import { PasswordResetRequestSchema, PasswordResetSchema, UserSignUpSchema, UserUpdateSchema } from '../validator'
import { connectToDatabase } from '../db'
import { formatError } from '../utils'
import User, { IUser } from '../db/models/user.model'
import { revalidatePath } from 'next/cache'
import { PAGE_SIZE } from '../constants'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { EmailService } from '@/emails/email-service'

// In-memory store for reset tokens (use Redis in production)
const passwordResetTokens = new Map<string, {
  userId: string;
  email: string;
  expiresAt: Date;
}>()

type FormState = {
  message: string;
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    token?: string[];
  } | null;
}

export async function updateUser(user: z.infer<typeof UserUpdateSchema>) {
  try {
    await connectToDatabase()
    const dbUser = await User.findById(user._id)
    if (!dbUser) throw new Error('User not found')
    dbUser.name = user.name
    dbUser.email = user.email
    dbUser.role = user.role
    const updatedUser = await dbUser.save()
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
  } catch (error: unknown) { // Changed from implicit any to unknown
    return { 
      success: false, 
      message: formatError(error) 
    }
  }
}

export async function getUserById(userId: string) {
  await connectToDatabase()
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  return JSON.parse(JSON.stringify(user)) as IUser
}

// DELETE

export async function deleteUser(id: string) {
  try {
    await connectToDatabase()
    const res = await User.findByIdAndDelete(id)
    if (!res) throw new Error('User not found')
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User deleted successfully',
    }
  } catch (error: unknown) { // Changed from implicit any to unknown
    return { 
      success: false, 
      message: formatError(error) 
    }
  }
}

// GET
export async function getAllUsers({
  limit,
  page,
}: {
  limit?: number
  page: number
}) {
  limit = limit || PAGE_SIZE
  await connectToDatabase()

  const skipAmount = (Number(page) - 1) * limit
  const users = await User.find()
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(limit)
  const usersCount = await User.countDocuments()
  return {
    data: JSON.parse(JSON.stringify(users)) as IUser[],
    totalPages: Math.ceil(usersCount / limit),
  }
}

export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn('credentials', { ...user, redirect: false })
}
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false })
  redirect(redirectTo.redirect)
}
export const SignInWithGoogle = async () => {
  await signIn('google')
}

// CREATE
export async function registerUser(userSignUp: IUserSignUp) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    })

    await connectToDatabase()
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    })
    return { success: true, message: 'User created successfully' }
  } catch (error: unknown) { // Changed from implicit any to unknown
    return { 
      success: false, 
      error: formatError(error) 
    }
  }
}

// UPDATE
export async function updateUserName(user: IUserName) {
  try {
    await connectToDatabase()
    const session = await auth()
    const currentUser = await User.findById(session?.user?.id)
    if (!currentUser) throw new Error('User not found')
    currentUser.name = user.name
    const updatedUser = await currentUser.save()
    return {
      success: true,
      message: 'User updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
  } catch (error: unknown) { // Changed from implicit any to unknown
    return { 
      success: false, 
      message: formatError(error) 
    }
  }
}

// PASSWORD RESET FUNCTIONS

export async function requestPasswordReset(prevState: FormState, formData: FormData) {
  try {
    const validatedFields = PasswordResetRequestSchema.safeParse({
      email: formData.get('email'),
    })

    if (!validatedFields.success) {
      return {
        message: 'Invalid email address',
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { email } = validatedFields.data

    await connectToDatabase()
    
    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      // Don't reveal whether email exists or not for security
      return {
        message: 'If an account with that email exists, we have sent a reset link.',
        success: true,
        errors: null,
      }
    }

    // Generate reset token
    const resetToken = uuidv4()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Store token (in production, use Redis or add to user document)
    passwordResetTokens.set(resetToken, {
      userId: user._id.toString(),
      email: user.email,
      expiresAt,
    })

    // Send reset email using EmailService
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
    
    const emailResult = await EmailService.sendPasswordResetEmail({
      email,
      resetLink,
      appName: process.env.APP_NAME || 'Zando-kin'
    })

    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error)
      // Continue anyway to not reveal if email exists
    }

    return {
      message: 'If an account with that email exists, we have sent a reset link.',
      success: true,
      errors: null,
    }
  } catch (error: unknown) { // Added explicit error type
    console.error('Password reset request error:', error)
    return {
      message: 'An error occurred while processing your request.',
      success: false,
      errors: null,
    }
  }
}

export async function resetPassword(prevState: FormState, formData: FormData) {
  try {
    const validatedFields = PasswordResetSchema.safeParse({
      token: formData.get('token'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    if (!validatedFields.success) {
      return {
        message: 'Invalid form data',
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { token, password } = validatedFields.data

    // Verify reset token
    const resetData = passwordResetTokens.get(token)
    if (!resetData) {
      return {
        message: 'Invalid or expired reset token',
        success: false,
        errors: null,
      }
    }

    if (new Date() > resetData.expiresAt) {
      passwordResetTokens.delete(token)
      return {
        message: 'Reset token has expired',
        success: false,
        errors: null,
      }
    }

    await connectToDatabase()

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password
    const updatedUser = await User.findByIdAndUpdate(
      resetData.userId.toString(),
      { password: hashedPassword },
      { new: true }
    )

    if (!updatedUser) {
      return {
        message: 'User not found',
        success: false,
        errors: null,
      }
    }

    // Delete used token
    passwordResetTokens.delete(token)

    // Send confirmation email using EmailService
    const emailResult = await EmailService.sendPasswordResetConfirmationEmail({
      email: resetData.email,
      appName: process.env.APP_NAME || 'Zando-kin'
    })

    if (!emailResult.success) {
      console.error('Failed to send password reset confirmation email:', emailResult.error)
      // Continue anyway - password was still reset
    }

    return {
      message: 'Password reset successfully!',
      success: true,
      errors: null,
    }
  } catch (error: unknown) { // Added explicit error type
    console.error('Password reset error:', error)
    return {
      message: 'An error occurred while resetting your password.',
      success: false,
      errors: null,
    }
  }
}

// Verify reset token (for page validation)
export async function verifyResetToken(token: string) {
  const resetData = passwordResetTokens.get(token)
  
  if (!resetData) {
    return { valid: false, message: 'Invalid reset token' }
  }

  if (new Date() > resetData.expiresAt) {
    passwordResetTokens.delete(token)
    return { valid: false, message: 'Reset token has expired' }
  }

  return { valid: true, email: resetData.email }
}

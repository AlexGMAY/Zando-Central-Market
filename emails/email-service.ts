import { APP_NAME } from '@/lib/constants'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface PasswordResetEmailProps {
  email: string
  resetLink: string
  appName: string
}

export interface PasswordResetConfirmationEmailProps {
  email: string
  appName: string
}

export class EmailService {
  static async sendPasswordResetEmail({ email, resetLink, appName }: PasswordResetEmailProps) {
    try {
      await resend.emails.send({
        from: 'noreply@yourdomain.com',
        to: email,
        subject: 'Reset Your Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Password Reset Request</h2>
            <p>You requested to reset your password for your ${APP_NAME} account. Click the button below to create a new password:</p>
            <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
              Reset Password
            </a>
            <p><strong>This link will expire in 1 hour.</strong></p>
            <p>If you didn't request this reset, please ignore this email and your password will remain unchanged.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              © ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.
            </p>
          </div>
        `,
      })
      return { success: true }
    } catch (error) {
      console.error('Password reset email error:', error)
      return { success: false, error }
    }
  }

  static async sendPasswordResetConfirmationEmail({ email, appName }: PasswordResetConfirmationEmailProps) {
    try {
      await resend.emails.send({
        from: 'noreply@yourdomain.com',
        to: email,
        subject: 'Password Reset Successful',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">Password Reset Successful</h2>
            <p>Your password for ${APP_NAME} has been successfully reset.</p>
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 6px; margin: 16px 0;">
              <p style="margin: 0; color: #065f46;">
                <strong>Security Tip:</strong> Use a strong, unique password and enable two-factor authentication for better security.
              </p>
            </div>
            <p>If you did not make this change, please contact our support team immediately.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              © ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.
            </p>
          </div>
        `,
      })
      return { success: true }
    } catch (error) {
      console.error('Password reset confirmation email error:', error)
      return { success: false, error }
    }
  }
}

import UserModel from '../models/user.model.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'
import { PasswordHelper } from '../utils/bcrypt.js'
import { apiResponse, apiResponseValidation } from '../utils/response.js'

class AuthController {
  static async register(req, res, next) {
    const result = registerSchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error })
    }

    const { username, email, password } = result.data

    try {
      const newUser = await UserModel.create({
        username,
        email,
        password: await PasswordHelper.hash(password),
      })

      return apiResponse({
        res,
        status: 201,
        message: 'Register berhasil',
        data: null
      })
    } catch (error) {
      if (error.code === 11000) {
        return apiResponse({
          res,
          status: 409,
          message: 'Username atau email sudah digunakan',
        })
      }

      return next(error)
    }
  }

  static async login(req, res, next) {
    const result = loginSchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error })
    }

    const { email, password } = result.data

    try {
      const user = await UserModel.findOne({ email }).select('+password')

      if (!user) {
        return apiResponse({
          res,
          status: 401,
          message: 'Email atau password tidak valid',
        })
      }

      const passwordMatches = await PasswordHelper.compare(password, user.password)

      if (!passwordMatches) {
        return apiResponse({
          res,
          status: 401,
          message: 'Email atau password tidak valid',
        })
      }

      // Generate access token (assuming you have a JwtHelper)
      // const accessToken = JwtHelper.sign({ sub: user._id.toString() })

      return apiResponse({
        res,
        status: 200,
        message: 'Login berhasil',
        data: {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
          },
          // access_token: accessToken,
          // token_type: 'Bearer',
        },
      })
    } catch (error) {
      return next(error)
    }
  }
}

export default AuthController
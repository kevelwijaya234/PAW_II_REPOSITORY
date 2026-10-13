import { createUserSchema } from '../schemas/user.schema.js'
import { apiResponse, apiResponseValidation } from '../utils/response.js'

class UserController {
  static store(req, res) {
    const result = createUserSchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      })
    }

    const { name, email } = result.data

    return apiResponse({
      res,
      status: 201,
      message: 'User created successfully',
      data: {
        name,
        email,
      },
    })
  }
}

export default UserController

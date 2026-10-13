import { apiResponse } from '../utils/response.js'

class WelcomeController {
  static index(_req, res) {
    res.render('pages/home', {
      title: 'Welcome Page',
    })
  }

  static welcome(_req, res) {
    return apiResponse({
      res,
      status: 200,
      message: 'Welcome to Express ESM Generator',
      data: {},
    })
  }
}

export default WelcomeController

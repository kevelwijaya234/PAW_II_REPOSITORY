import { apiResponse } from '../utils/response.js'

class UploadController {
  static store(req, res) {
    return apiResponse({
      res,
      status: 201,
      message: 'File uploaded successfully',
      data: {
        file: req.file,
      },
    })
  }
}

export default UploadController

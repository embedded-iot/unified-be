const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { faultValidation } = require('../../validations');
const { faultController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(faultValidation.createFault), faultController.createFault)
  .get(auth(), validate(faultValidation.getFaults), faultController.getFaults);

router.route('/latest').get(auth(), validate(faultValidation.getLatestFault), faultController.getLatestFault);

router
  .route('/:faultId')
  .get(auth(), validate(faultValidation.getFault), faultController.getFault)
  .patch(auth(), validate(faultValidation.updateFault), faultController.updateFault)
  .delete(auth(), validate(faultValidation.deleteFault), faultController.deleteFault);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Faults
 *   description: Fault management and retrieval
 */

/**
 * @swagger
 * path:
 *  /faults:
 *    post:
 *      summary: Create a fault
 *      description: _
 *      tags: [Faults]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - deviceId
 *                - category
 *                - type
 *                - event
 *                - position
 *              properties:
 *                gatewayId:
 *                   type: string
 *                deviceId:
 *                   type: string
 *                category:
 *                   type: string
 *                type:
 *                   type: string
 *                event:
 *                   type: string
 *                position:
 *                   type: number
 *                description:
 *                   type: string
 *                reason:
 *                   type: string
 *                suggest:
 *                   type: string
 *                faultData:
 *                   type: object
 *              example:
 *                gatewayId: Gateway id
 *                deviceId: '1'
 *                category: LoggerFault
 *                type: Error
 *                event: Devices
 *                position: 2
 *                description: This is description
 *                reason: This is reason
 *                suggest: This is suggest
 *                faultData: {}
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Fault'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *
 *    get:
 *      summary: Get all faults
 *      description: _
 *      tags: [Faults]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: gatewayId
 *          schema:
 *            type: string
 *          description: Gateway id
 *        - in: query
 *          name: from
 *          schema:
 *            type: string
 *          description: Start datetime. ex. 2021-03-15 00:00:00
 *        - in: query
 *          name: to
 *          schema:
 *            type: string
 *          description: End datetime
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of faults
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Fault'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /faults/{id}:
 *    get:
 *      summary: Get a fault
 *      description: Get fault by ID
 *      tags: [Faults]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Fault id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Fault'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a fault
 *      description: Update fault by ID
 *      tags: [Faults]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Fault id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - deviceId
 *                - category
 *                - type
 *                - event
 *                - position
 *              properties:
 *                gatewayId:
 *                   type: string
 *                deviceId:
 *                   type: string
 *                category:
 *                   type: string
 *                type:
 *                   type: string
 *                position:
 *                   type: number
 *                description:
 *                   type: string
 *                reason:
 *                   type: string
 *                suggest:
 *                   type: string
 *                faultData:
 *                   type: object
 *              example:
 *                gatewayId: Gateway id
 *                deviceId: '1'
 *                category: LoggerFault
 *                type: Error
 *                event: Devices
 *                position: 1
 *                description: This is description
 *                reason: This is reason
 *                suggest: This is suggest
 *                faultData: {}
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Fault'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a fault
 *      description: Delete fault by ID
 *      tags: [Faults]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Fault id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /faults/latest:
 *    get:
 *      summary: Get latest fault
 *      description: Get latest fault
 *      tags: [Faults]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: gatewayId
 *          schema:
 *            type: string
 *          description: Gateway id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Fault'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

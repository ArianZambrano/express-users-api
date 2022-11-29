/**
 * @swagger
 * /:
 *   post:
 *     summary: Creates a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: New User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/LoginResponse'
 * 
 *   get:
 *     summary: Deletes a user
 *     tags: [User]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Get request success
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 totalUsers:
 *                   schema:
 *                     type: int
 *                 users:
 *                   schema:
 *                     type: object
 * 
 *   delete:
 *     summary: Gets all the users
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: User's token
 *         example: Bearer 1234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CustomResponse'
 * 
 *   put:
 *     summary: Update my account
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: User's token
 *         example: Bearer 1234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               description:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Put request success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CustomResponse'
 * 
 * /login:
 *   post:
 *     summary: Checks the login of a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/LoginResponse'
 * 
 * /{id}:
 *   get:
 *     summary: Gets the info of a specific user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *         description: User's id
 *         example: 1
 *     responses:
 *       201:
 *         description: The User requested
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 * 
 * /follow:
 *   put:
 *     summary: Follow a user
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: User's token
 *         example: Bearer 1234
 *       - in: query
 *         name: followId
 *         required: true
 *         schema:
 *           type: string
 *         description: User to follow's id
 *         example: 1234
 *     responses:
 *       200:
 *         description: Following user done!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CustomResponse'
 * 
 * /unfollow:
 *   put:
 *     summary: Unfollow a user
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: User's token
 *         example: Bearer 1234
 *       - in: query
 *         name: followId
 *         required: true
 *         schema:
 *           type: string
 *         description: User to unfollow's id
 *         example: 1234
 *     responses:
 *       200:
 *         description: Unfollowing user done!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CustomResponse'
 * 
 */
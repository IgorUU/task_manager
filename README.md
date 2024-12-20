# Starting the project

```
docker compose up -d
docker compose exec php composer install
```

Task manager app is served on http://localhost:3000/.
<br />
<br />

# Future plans
- [ ] Registration and login. (Tokens, OAuth...)
- [ ] Session handling.
- [ ] Edit existing tasks.
- [ ] Delete task one by one.
- [ ] Make sure it looks good on mobile.
- [x] Optimise the CreateTaksForm file. Extract methods to some other components/classes.
- [x] Drag and drop tasks to reorder them.
- [x] Fully understand the process of DND. Optimise the structure.
- [x] DND reordering should be preserved on page reload.
- [x] When tasks are deleted, the new one should have an ID 1.
- [x] Take care of tasks going down because of the sentence "New task has been created".
- [x] Make form buttons change style on hover over.
- [x] Add some cool styling.
- [x] Latest task must the first one after the form.
- [x] Create a link for dropping all of the database tables ("Clear all tasks").
- [x] That link must work on ajax like the task creation.
- [x] Create a task description field that is also going to be saved in the database table.
<br />
<br />

# Important notes

- This project is using **SQLite**. In order to use **MySQL**, you would need to install PHP extensions **mysqli** and **pdo_mysql**.
- In order to properly connect to the SQLite database and execute queries in the PHPStorm I needed to install the recommended SQLite driver.
<br />
<br />

# Known issues
- ~~Apache doesn't redirect every request to index.php. So the router can't do it's job.~~ <br />
Apache removed in favore of Nginx. <br />
Nginx configuration is under **backend/default.conf**.

<br />
<br />
<br />
<br />
<br />
<br />
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

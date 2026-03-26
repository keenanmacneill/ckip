Phase 4: Load Testing and Deployment
Deploy your app to Heroku, AWS, or DigitalOcean. Get it running end-to-end in a real environment before you start any performance work.
Seed your database with 10,000 rows. Use a script, not manual inserts. Run a load test with Artillery, Gatling, or New Relic. Record your baseline response times and error rates.

Repeat at 100k, 1 million, and 5 million rows. At each step, measure before you optimize. Document what broke and what held up. Your targets are sub-500ms response times and under 5% error rate under randomized load.
When things slow down, investigate before guessing. Look at your query plans. Consider indexes, connection pooling, and pagination. Then look at whether load balancing applies to your setup and what it would actually solve.

Phase 5: Auth, Roles, and Polish
Add roles and permissions. Admins can create, update, and delete categories. Regular users can only edit or delete their own reports and their own accounts. Enforce this on the backend. Frontend checks are not enough.

Add query parameters to your URLs where it makes sense. Category filter, pagination, and sort order are good candidates. Make sure the URL reflects the current view so it can be shared or bookmarked.

Go through your error handling. Every endpoint should return a useful status code and message. The frontend should handle failure states without crashing or going silent.
Clean up your README. It should explain what the app does, how to run it locally, how to run the load tests, and what your performance results looked like. Write it for someone who has never seen the project.
Prep your demo. Know what you're showing, in what order, and what you'll say if something breaks live.

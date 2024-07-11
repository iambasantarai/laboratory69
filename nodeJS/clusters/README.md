## Without cluster module

Start server using following command.

```bash
npm run dev
```

Perform loadtest using `loadtest` package.

```bash
npx loadtest -n 1200 -c 200 -k http://localhost:3000/heavy
```

The `-n` option accepts the number of requests the package should send, which is 1200 requests here.
The `-c` option accepts the number of requests that should be sent simultaneously to the server.

From output of the above command, take note of the `Total time`, `Request per second` & `Mean latency`.

## Run clustered application

Start server using following command.

```bash
npm run primary
```

Perform loadtest using `loadtest` package.

```bash
npx loadtest -n 1200 -c 200 -k http://localhost:3000/heavy
```

From output of the above command, take note of the `Total time`, `Request per second` & `Mean latency`.
And compare it with the previous output.

### References

- [How To Scale Node.js Applications with Clustering](https://www.digitalocean.com/community/tutorials/how-to-scale-node-js-applications-with-clustering)

## Single worker thread

Start server using following command.

```bash
npm run 1-worker
```

Monitor the response time using `curl`

```bash
time curl --get http://localhost:3000/blocking
```

Output

```bash
real	0m31.930s
user	0m0.006s
sys	0m0.007s
```

## Four worker thread

Start server using following command.

```bash
npm run 4-worker
```

Monitor the response time using `curl`

```bash
time curl --get http://localhost:3000/blocking
```

Output

```bash
real	0m8.171s
user	0m0.007s
sys	0m0.005s
```

### References

- [How To Use Multithreading in Node.js](https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js#prerequisites)

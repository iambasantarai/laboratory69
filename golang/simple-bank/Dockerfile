# Build stage
FROM golang:1.23-alpine3.21 as builder
WORKDIR /app
COPY . .
RUN go build -o main main.go

# Run stage
FROM alpine:3.21
WORKDIR /app
COPY --from=builder /app/main .

EXPOSE 8080/tcp
CMD ["/app/main"]

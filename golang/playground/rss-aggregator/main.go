package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    portString := os.Getenv("PORT")
    if portString == "" {
        log.Fatal("Value for PORT not found in .env file")
    }

    router := chi.NewRouter()

    router.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{"https://*", "http://*"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: false,
        MaxAge:           300,
    }))

    server := &http.Server{
        Handler: router,
        Addr: ":" + portString,
    }

    srvErr := server.ListenAndServe()
    if srvErr != nil {
        log.Fatal(err)
    }
    log.Printf("Server listening at http://localhost:%v", portString)
}

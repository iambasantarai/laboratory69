package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"rss-aggregator/internal/database"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

type apiConfig struct {
    DB *database.Queries
}

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    portString := os.Getenv("PORT")
    if portString == "" {
        log.Fatal("Value for PORT not found in .env file")
    }

    dbURL := os.Getenv("DB_URL")
    if dbURL == "" {
        log.Fatal("Value for DB_URL not found in .env file")
    }

    conn, err := sql.Open("postgres", dbURL)
    if err != nil {
        log.Fatal("Failed to connect to database: ", err)
    }

    db := database.New(conn)
    apiCfg := apiConfig{
        DB: db,
    }

    go startScraping(db, 10, time.Minute)

    router := chi.NewRouter()

    router.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{"https://*", "http://*"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: false,
        MaxAge:           300,
    }))

    v1Router := chi.NewRouter()
    v1Router.Get("/healthz", handlerReadiness)
    v1Router.Get("/error", handlerError)

    v1Router.Post("/users", apiCfg.handlerCreateUser)
    v1Router.Get("/users",apiCfg.middlewareAuth(apiCfg.handlerGetUser))

    v1Router.Post("/feeds",apiCfg.middlewareAuth(apiCfg.handlerCreateFeed))
    v1Router.Get("/feeds",apiCfg.handlerGetFeeds)

    v1Router.Get("/posts", apiCfg.middlewareAuth(apiCfg.handlerGetPostForUser))

    v1Router.Post("/feed_follows",apiCfg.middlewareAuth(apiCfg.handlerCreateFeedFollow))
    v1Router.Get("/feed_follows",apiCfg.middlewareAuth(apiCfg.handlerGetFeedFollows))
    v1Router.Delete("/feed_follows/{feedFollowID}",apiCfg.middlewareAuth(apiCfg.handlerDeleteFeedFollow))

    router.Mount("/v1", v1Router)

    server := &http.Server{
        Handler: router,
        Addr: ":" + portString,
    }

    log.Printf("Server listening at http://localhost:%v", portString)
    srvErr := server.ListenAndServe()
    if srvErr != nil {
        log.Fatal(err)
    }
}

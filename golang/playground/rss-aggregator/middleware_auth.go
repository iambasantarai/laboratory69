package main

import (
	"fmt"
	"net/http"
	"rss-aggregator/internal/auth"
	"rss-aggregator/internal/database"
)

type  authHandler func (http.ResponseWriter, *http.Request, database.User)

func (apiCfg *apiConfig) middlewareAuth(handler authHandler) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        apiKey, err := auth.GetAPIKey(r.Header)
        if err != nil {
            respondWithError(w, 403, fmt.Sprintf("Auth error: %v", err))
            return 
        }

        user, err := apiCfg.DB.GetUserByAPIKey(r.Context(), apiKey)
        if err != nil {
            respondWithError(w, 400, fmt.Sprintf("Couldn't get the user: %v", err))
            return 
        }

        handler(w, r, user)
    }
}

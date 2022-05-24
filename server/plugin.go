package main

import (
	"net/http"
	"sync"

	"github.com/mattermost/mattermost-plugin-starter-template/server/helpers"
	"github.com/mattermost/mattermost-plugin-starter-template/server/models"
	"github.com/mattermost/mattermost-plugin-starter-template/server/services"
	"github.com/mattermost/mattermost-server/v6/plugin"
	"github.com/mattermost/mattermost-server/v6/store/sqlstore"
)

// Plugin implements the interface expected by the Mattermost server to communicate between the server and plugin processes.
type Plugin struct {
	plugin.MattermostPlugin

	// configurationLock synchronizes access to the configuration.
	configurationLock sync.RWMutex

	// configuration is the active plugin configuration. Consult getConfiguration and
	// setConfiguration for usage.
	configuration *configuration

	dbService *services.DbService
}

func (p *Plugin) OnActivate() error {
	appConfig := p.API.GetUnsanitizedConfig()

	p.dbService = &services.DbService{
		Supplier: sqlstore.New(appConfig.SqlSettings, nil),
	}

	return nil

}

// ServeHTTP demonstrates a plugin that handles HTTP requests by greeting the world.
func (p *Plugin) ServeHTTP(c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	handlers := [](func(c *plugin.Context, w http.ResponseWriter, r *http.Request) bool){
		makeHandler("/bookmark/folder/list", p.serveBookmarkFolderList),
		makeHandler("/bookmark/folder/deletion", p.deleteBookmarkFolder),
		makeHandler("/bookmark/folder/creation", p.createBookmarkFolder),
		makeHandler("/bookmark/folder", p.updateBookmarkFolder),
		makeHandler("/bookmark/message/list", p.serveBookmarkMessageList),
		makeHandler("/bookmark/message/deletion", p.deleteBookmarkMessage),
		makeHandler("/bookmark/message/move", p.attachBookmarkMessage),
	}

	for _, handler := range handlers {
		if didHandle := handler(c, w, r); didHandle {
			return
		}
	}

	w.WriteHeader(404)

}

func makeHandler(path string, handler func(basePath string, c *plugin.Context, w http.ResponseWriter, r *http.Request)) func(c *plugin.Context, w http.ResponseWriter, r *http.Request) bool {
	return func(c *plugin.Context, w http.ResponseWriter, r *http.Request) bool {
		if len(r.URL.Path) >= len(path) && r.URL.Path[:len(path)] == path {
			handler(path, c, w, r)
			return true
		}

		return false
	}

}

func (p *Plugin) createBookmarkFolder(basePath string, c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	// get parameters from url
	urlParams := helpers.GetURLPathParams(r.URL.Path, basePath)
	folderName := urlParams[0]

	// get values from header
	q := r.URL.Query()
	model := &models.FolderRequest{}

	// make DTO
	model.FromQueryString(&q)

	// sql query
	if p.dbService.IsExistFolderName(folderName, model) {
		w.Write([]byte("X"))
		return
	}
	p.dbService.CreateFolder(folderName, model)
}

func (p *Plugin) updateBookmarkFolder(basePath string, c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	// get parameters from url
	urlParams := helpers.GetURLPathParams(r.URL.Path, basePath)
	prevFolderName := urlParams[0]
	postFolderName := urlParams[1]

	// get values from header
	q := r.URL.Query()
	model := &models.FolderRequest{}

	// make DTO
	model.FromQueryString(&q)

	// sql query
	if p.dbService.IsExistFolderName(postFolderName, model) {
		w.Write([]byte("X"))
		return
	}

	p.dbService.UpdateFolder(prevFolderName, postFolderName, model)
}

func (p *Plugin) deleteBookmarkFolder(basePath string, c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	// get parameters from url
	urlParams := helpers.GetURLPathParams(r.URL.Path, basePath)
	folderName := urlParams[0]

	// get values from header
	q := r.URL.Query()
	model := &models.FolderRequest{}

	// make DTO
	model.FromQueryString(&q)

	// sql query
	p.dbService.DeleteFolder(folderName, model)
}

func (p *Plugin) serveBookmarkFolderList(basePath string, c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	// get values from header
	q := r.URL.Query()
	model := &models.FolderRequest{}

	// make DTO
	model.FromQueryString(&q)

	// sql query
	files := p.dbService.GetFolderList(model)
	p.dbService.GetFolderList(model)

	response := &models.FolderResponse{
		Items: files,
	}

	helpers.ServeJSON(response, w)
}

func (p *Plugin) serveBookmarkMessageList(basePath string, c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	urlParams := helpers.GetURLPathParams(r.URL.Path, basePath)
	folderName := urlParams[0]

	// get values from header
	q := r.URL.Query()
	model := &models.FolderRequest{}

	// make DTO
	model.FromQueryString(&q)

	// sql query
	files := p.dbService.GetMessageList(folderName, model)
	p.dbService.GetMessageList(folderName, model)

	response := &models.MessageResponse{
		Items: files,
	}

	helpers.ServeJSON(response, w)
}

func (p *Plugin) deleteBookmarkMessage(basePath string, c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	// get parameters from url
	urlParams := helpers.GetURLPathParams(r.URL.Path, basePath)
	folderName := urlParams[0]
	postId := urlParams[1]

	// get values from header
	q := r.URL.Query()
	model := &models.FolderRequest{}

	// make DTO
	model.FromQueryString(&q)

	// sql query
	p.dbService.DeleteMessage(folderName, postId, model)
}

func (p *Plugin) attachBookmarkMessage(basePath string, c *plugin.Context, w http.ResponseWriter, r *http.Request) {

	// get parameters from url
	urlParams := helpers.GetURLPathParams(r.URL.Path, basePath)
	folderName := urlParams[0]
	postId := urlParams[1]

	// get values from header
	q := r.URL.Query()
	model := &models.FolderRequest{}

	// make DTO
	model.FromQueryString(&q)

	// sql query
	p.dbService.AttachMessage(folderName, postId, model)
}

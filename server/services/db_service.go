package services

import (
	"github.com/mattermost/mattermost-plugin-starter-template/server/models"
	"github.com/mattermost/mattermost-server/v6/store/sqlstore"
)

type DbService struct {
	Supplier *sqlstore.SqlStore
}

func (s *DbService) IsExistFolderName(folderName string, model *models.FolderRequest) bool {

	sql := `SELECT COUNT(*) FROM preferences where category = '` + folderName + `' AND userid = '` + model.UserId + `'`
	sqlParams := make(map[string]interface{})
	count, _ := s.Supplier.GetReplica().SelectInt(sql, sqlParams)

	if count > 0 {
		return true
	}
	return false
}

func (s *DbService) CreateFolder(folderName string, model *models.FolderRequest) {

	sql := `INSERT INTO preferences values('` + model.UserId + `', '` + folderName + `' ,'folder',true)`

	s.Supplier.GetReplica().Query(sql)
}

// 확인
func (s *DbService) DeleteFolder(folderName string, model *models.FolderRequest) {

	sql := `DELETE FROM preferences where category = '` + folderName + `' AND userid = '` + model.UserId + `'`

	s.Supplier.GetReplica().Query(sql)
}

// 확인
func (s *DbService) UpdateFolder(prevFolderName string, postFolderName string, model *models.FolderRequest) {

	sql := `UPDATE preferences set category = '` + postFolderName + `' where userid = '` + model.UserId + `' AND category = '` + prevFolderName + `'`

	s.Supplier.GetReplica().Query(sql)
}

// 확인
func (s *DbService) GetFolderList(model *models.FolderRequest) []*models.FolderListItem {

	sql := `SELECT category as FolderName from preferences where userid = '` + model.UserId + `' AND name = 'folder'`

	var files []*models.FolderListItem

	s.Supplier.GetReplica().Select(&files, sql)

	return files
}

func (s *DbService) GetMessageList(folderName string, model *models.FolderRequest) []*models.MessageListItem {

	sql := `SELECT name as PostId from preferences where userid = '` + model.UserId + `' AND category = '` + folderName + `' AND name != 'folder'`

	var files []*models.MessageListItem

	s.Supplier.GetReplica().Select(&files, sql)

	return files
}

// 확인
func (s *DbService) AttachMessage(folderName string, postId string, model *models.FolderRequest) {
	sql := `INSERT INTO preferences values ('` + model.UserId + `', '` + folderName + `', '` + postId + `',true)`

	s.Supplier.GetReplica().Query(sql)
}

// 확인
func (s *DbService) DeleteMessage(folderName string, postId string, model *models.FolderRequest) {
	sql := `DELETE FROM preferences where userid = '` + model.UserId + `' AND category = '` + folderName + `' AND name = '` + postId + `'`

	s.Supplier.GetReplica().Query(sql)
}

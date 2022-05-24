package models

import (
	"net/url"
)

type FolderRequest struct {
	UserId string
}

func (p *FolderRequest) FromQueryString(q *url.Values) {

	p.UserId = q.Get("UserId")

}

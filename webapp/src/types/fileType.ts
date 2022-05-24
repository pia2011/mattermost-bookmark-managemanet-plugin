interface FileType {
  channel_id: string;
  create_at: number;
  delete_at: number;
  extension: string;
  has_preview_image: boolean;
  height: number;
  id: string;
  mime_type: string;
  mini_preview: string;
  name: string;
  post_id: string;
  remote_id: string;
  size: number;
  update_at: number;
  user_id: string;
  width: number;
}

export type { FileType };

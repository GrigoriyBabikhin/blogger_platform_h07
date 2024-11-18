export type CommentInputModel = {
    content: string;
}

export type CommentViewModel = {
    id: string;
    content: string;
    commentatorInfo: CommentatorInfo;
    createdAt: string;

}

export type CommentatorInfo = {
    userId: string
    userLogin: string
}

export type CommentDBType = {
    postId: string;
    content: string;
    commentatorInfo: CommentatorInfo;
    createdAt: string;
}
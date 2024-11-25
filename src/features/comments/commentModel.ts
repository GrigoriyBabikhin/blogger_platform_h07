export type CommentInputModel = {
    content: string;
}

export type CommentIdModel = {
    commentId: string;
}

export type CommentViewModel = {
    id: string;
    content: string;
    commentatorInfo: CommentatorInfoModel;
    createdAt: string;
}

export type CommentatorInfoModel = {
    userId: string
    userLogin: string
}

export type CommentDbModel = {
    postId: string;
    content: string;
    commentatorInfo: CommentatorInfoModel;
    createdAt: string;
}
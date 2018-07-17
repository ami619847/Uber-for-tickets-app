import { JsonController, Get, Param, 
    //Authorized, 
    Post, HttpCode, Body } from 'routing-controllers'
import Comment from './entity'

@JsonController()
export default class CommentController {

    @Get('/comments')
    async allComments() {
        const comments = await Comment.find()
        return { comments }
    }   
   
    @Get('/comments/:id([0-9]+)')
    getComment(
        @Param('id') id: number
    ) {
        return Comment.findOne(id)
    }  

    //@Authorized()
    @Post('/comments')
    @HttpCode(201)
    createComment(
        @Body() comment: Comment
    ) {
        return comment.save()
    }

}
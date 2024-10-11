import commentModel from "../models/commentModel.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const createComment = async (req, res) => {
  const { userId, postId } = req.query;
  if (!userId || !postId) {
    return res
      .status(404)
      .json({ error: "Não foi possível identificar o usuário" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user || user.blocked === true || user.limit < 1) {
      return res
        .status(409)
        .json({ error: "Não foi possível comentar nesse post" });
    }

    const post = await postModel.findById(postId);
    if (!post || post.blocked === true) {
      return res
        .status(404)
        .json({ error: "Não foi possível comentar nesse post" });
    }

    const spanComment = await commentModel.findOne({ userId, postId, comment });
    if (spanComment) {
      return res
        .status(409)
        .json({ error: "Não é permitido comentários duplicados." });
    }

    const newComment = await commentModel.create({
      userId,
      postId,
      author: user.username,
      comment,
    });

    await userModel.findByIdAndUpdate(
      userId,
      { $inc: { limit: -1 }, $push: { commentId: newComment._id } },
      { new: true }
    );

    await postModel.findByIdAndUpdate(
      userId,
      {
        $push: { commentId: newComment._id },
      },
      { new: true }
    );
    res.status(201).json({ msg: "Comentario feito com sucesso!" });
  } catch (error) {
    res.status(500).json({
      error:
        "Não foi possível receber os dado necessários para comentar nesse post",
      details: error.message,
    });
  }
};

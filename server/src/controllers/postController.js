import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const listPost = async (_, res) => {
  try {
    const countPost = await postModel.countDocuments();
    if (countPost < 1) {
      return res
        .status(404)
        .json({ error: "Não foi possível encontrar um post" });
    }
    const post = await postModel.find({ blocked: false });
    if (post.length < 1) {
      return res
        .status(404)
        .json({ error: "Não encontrar nenhum post debloqueado" });
    }

    res.status(200).json({ msg: "Lista de post", post });
  } catch (error) {
    res.status(500).json({
      error:
        "Não foi possível receber os dados necessários para mostrar a lista de posts",
      details: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res
      .status(404)
      .json({ error: "Nào foi possível identificar o usuário" });
  }
  const { title, details, author } = req.body;
  if (!title || !details || !author) {
    return res.status(404).json({
      error:
        "Não foi possível encontrar todos os dados necessários para criar o post",
    });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user || user.blocked === true || user.limit <= 0) {
      return res.status(409).json({ error: "Não foi possível criar o post" });
    }

    const post = await postModel.findOne({ title });
    if (post) {
      return res.status(409).json({ error: "Não foi possível criar o post" });
    }

    const newPost = await postModel.create({
      userId,
      title,
      author,
      details,
    });

    await userModel.findByIdAndUpdate(
      userId,
      {
        $push: { postId: newPost._id },
        $inc: { limit: -1 },
      },
      { new: true }
    );

    res.status(201).json({ msg: "Post Done" });
  } catch (error) {
    res.status(500).json({
      error:
        "Não foi possível encontrar os dados necessários para criar o anúncio",
    });
  }
};

export const deletePost = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res
      .status(404)
      .json({ error: "Não foi possível identificar o usuário" });
  }
  const { postId } = req.body;
  if (!postId) {
    return res
      .status(404)
      .json({ error: "Não foi possível identificar o post" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Não foi possível deletar o post" });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Não foi possível deletar o post" });
    }

    if (post.userId !== user._id && user.role !== "admin") {
      return res.status(409).json({ error: "Você não pode deletar esse post" });
    }
    res.status(200).json({ msg: "Post Deleted" });
  } catch (error) {
    res.status(500).json({
      error:
        "Não foi possível receber os dados necessários para deletar o post",
      details: error.message,
    });
  }
};

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      enum: [
        "Outros",
        "Website",
        "Mobile",
        "Ux/Ui",
        "Copyright",
        "Seo",
        "Gestão de Projeto",
        "Arquitetura de Projetos",
        "Automação",
        "Tradução",
        "Edição de Vídeo",
        "Edição de Fotos",
        "Contabilidade",
        "Gerenciamento de Projetos",
      ],
      minLength: 1,
      maxLength: 5,
      commentId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "comments",
        },
      ],
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);

export default postModel;

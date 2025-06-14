import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../services/interfaces/general.interface";

interface INews extends Document {
    title: string;
    subtitle: string;
    text: string;
    createdAt: string;
    image: IImage;
    isInTop: string;
    link?: string;
    updatedAt: string;
}

const newsSchema = new Schema<INews>({
    title:{
        type: String,
        required: true
    },
    subtitle:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    isInTop:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: false
    },
    createdAt:{
        type: String,
        required: true
    },
    updatedAt:{
        type: String,
        required: true
    },
    image:{
        type: Object,
        properties: {
            originalName: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            },
            size: {
                type: Number,
                required: false
            },
            publicId: {
                type: String,
                required: true
            },
            assetId:{
                type: String,
                required: true
            },
            versionId:{
                type: String,
                required: true
            },
            signature:{
                type: String,
                required: true
            },
            createdAt:{
                type: String,
                required: false
            }
        }
    }
});

const NewsModel = mongoose.model<INews>('News', newsSchema);

export default NewsModel;
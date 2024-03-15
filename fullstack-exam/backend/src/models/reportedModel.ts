import mongoose from "mongoose";

const ReportedSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        unique: true,
    },
    }
);

ReportedSchema.pre("find", function (next) {
    this.populate("post");
    next();
});

const ReportedModel = mongoose.model("Reported", ReportedSchema);
export default ReportedModel;
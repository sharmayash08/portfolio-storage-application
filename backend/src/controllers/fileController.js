const { uploadFileToS3 } = require("../utils/s3");

const uploadFile = async (req , res) => {
    try {
        const file = req.file;
        if(!file){
            return res.status(400).send({message : "Please select a file" });
        }

        const fileURL = await uploadFileToS3(file);

        res.status(201).json({message: "File uploaded Successfully" , fileURL});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error in File Controller"});
    }
}

module.exports = uploadFile;

module.exports = async (req, res) => {
    try {       
        const obj = {
            success: true,
            imgUrl: process.env.BUCKET_URL + req.file.key,
        };
        res.send(obj);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}
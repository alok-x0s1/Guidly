import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadDir = path.join(__dirname, "../../", "public/uploads");
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

		cb(
			null,
			`${file.fieldname}-${uniqueSuffix}${path.extname(
				file.originalname
			)}`
		);
	},
});

const upload = multer({ storage });

export default upload;

const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { Task } = require("../models");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

router.use(auth);

router.get("/", async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.json(task);
});

router.put("/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task || task.userId !== req.user.id) return res.sendStatus(403);
  await task.update(req.body);
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task || task.userId !== req.user.id) return res.sendStatus(403);
  await task.destroy();
  res.sendStatus(204);
});

router.post("/upload/excel", upload.single("file"), async (req, res) => {
  const file = xlsx.readFile(req.file.path);
  const sheet = file.Sheets[file.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet);

  for (const row of rows) {
    await Task.create({
      title: row.Title,
      description: row.Description,
      effort: row.Effort,
      due_date: row.DueDate,
      userId: req.user.id,
    });
  }

  fs.unlinkSync(req.file.path);
  res.json({ message: "Imported successfully" });
});

router.get("/export/excel", async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  const data = tasks.map((t) => ({
    Title: t.title,
    Description: t.description,
    Effort: t.effort,
    DueDate: t.due_date,
  }));

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, ws, "Tasks");

  const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
  res.setHeader("Content-Disposition", 'attachment; filename="tasks.xlsx"');
  res.type("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.send(buffer);
});

module.exports = router;

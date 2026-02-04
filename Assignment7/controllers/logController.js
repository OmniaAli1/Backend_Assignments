import Log from "../models/Log.js";

export const insertLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();

    res.status(201).json({
      message: "Log inserted successfully",
      log,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();

    res.json({
      count: logs.length,
      logs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

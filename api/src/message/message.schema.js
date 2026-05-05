const { z } = require("zod");

const createMessageSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  content: z.string().min(1, "Pesan tidak boleh kosong").max(500, "Pesan terlalu panjang"),
});

module.exports = {
  createMessageSchema,
};

const router = require('express').Router();

const { Op } = require('sequelize');
const { Song } = require('../db/models');

const { Artist } = require('../db/models');

router.get('/', async (req, res) => {
  const result = {
    total: 0, limit: 10, offset: 0, data: [],
  };
  const params = {};

  const {
    where, order, limit, offset,
  } = req.query || {};

  if (where) {
    const { field, search } = JSON.parse(where);

    let param = { [Op.iLike]: `%${search}%` };
    if (field === 'createdAt') {
      param = { [Op.eq]: new Date(search).toISOString() };
    }

    params.where = {
      [field]: param,
    };
  }

  if (order) {
    const { field, direction } = JSON.parse(order);
    params.order = [[field, direction]];
  }

  if (limit) {
    params.limit = limit;
    result.limit = limit;
  }

  if (offset) {
    params.offset = offset;
    result.offset = offset;
  }

  params.include = [{
    model: Artist,
    as: 'Artist',
    attributes: ['id', 'fullname'],
  }];

  const { count, rows } = await Song.findAndCountAll(params);

  result.total = count;
  result.data = rows;

  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Song.findOne({
      where: { id },
      include: [{
        model: Artist,
        as: 'Artist',
        attributes: ['id', 'fullname'],
      }],
    });
    res.status(200).json(data.toJSON());
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, artist_id } = req.body;
    const data = await Song.create({ title, artist_id }, { raw: true });
    res.status(200).json(data.toJSON());
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const [count, data] = await Song.update({ title }, {
      where: { id },
      returning: true,
      plain: true,
    });
    res.status(200).json(data.toJSON());
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Song.destroy({ where: { id } });
    res.status(200).json({ message: 'Запись удалена.' });
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;

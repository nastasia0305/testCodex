const { Op } = require('sequelize');
const router = require('express').Router();

const { Artist } = require('../db/models');
const { Song } = require('../db/models');

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

  const { count, rows } = await Artist.findAndCountAll(params);

  result.total = count;
  result.data = rows;

  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Artist.findOne({
      where: { id },
      include: [{
        model: Song,
        as: 'Songs',
        attributes: ['id', 'title'],
      }],
    });
    console.log('> get data', data.toJSON());
    res.status(200).json(data.toJSON());
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { fullname, description } = req.body;
    const blacklist = [
      'лиза монеточка',
      'монеточка',
      'лиза монета',
      'елизавета андреевна гырдымова',
      'monetochka',
      'monetochkaliska',
    ];

    if (blacklist.map((item) => item.toLowerCase()).includes(fullname.toLowerCase())) {
      throw new Error('Нельзя добавлять артиста');
    }

    const data = await Artist.create({ fullname, description }, { raw: true });
    return res.status(200).json(data.toJSON());
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, description } = req.body;
    const [count, data] = await Artist.update({ fullname, description }, {
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
    await Song.destroy({ where: { artist_id: id } });
    await Artist.destroy({ where: { id } });
    res.status(200).json({ message: 'Запись удалена.' });
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;

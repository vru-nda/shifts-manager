import {Request, RequestHandler, Response} from 'express';
import Shift from '../models/shift.model';

// @desc    Create a new vacancy
// @route   POST /api/vacancies
// @access  Public
export const createVacancy: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {title, description, dates, type} = req.body;

    // Validate title
    if (!title || title.length > 100) {
      res.status(400).json({
        error: 'Title is required and must be less than 100 characters',
      });
      return;
    }

    // Validate description
    if (description && description.length > 500) {
      res
        .status(400)
        .json({error: 'Description must be less than 500 characters'});
      return;
    }

    // Validate dates array
    if (
      !dates ||
      !Array.isArray(dates) ||
      dates.length < 1 ||
      dates.length > 10
    ) {
      res.status(400).json({error: 'Must include between 1 and 10 dates'});
      return;
    }

    // Validate type
    const validTypes = ['Consultation', 'Telephone', 'Ambulance'];
    if (!type || !validTypes.includes(type)) {
      res.status(400).json({error: 'Invalid type'});
      return;
    }

    // Check for time overlaps
    const existingShifts = await Shift.findAll({
      where: {
        type,
        date: dates.map((d) => d.date),
      },
    });
    if (existingShifts.length > 0) {
      res.status(400).json({error: 'There is already a shift at this time'});
      return;
    }

    const newVacancy = await Shift.create(req.body);
    res.status(201).json(newVacancy);
  } catch (error) {
    res.status(500).json({error: 'Failed to create vacancy'});
  }
};

// @desc    Get vacancy details
// @route   GET /api/vacancies/:id
// @access  Public
export const getVacancyDetails = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const vacancy = await Shift.findByPk(req.params.id);
    if (!vacancy) {
      res.status(404).json({error: 'Vacancy not found'});
      return;
    }
    res.json(vacancy);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch vacancy'});
  }
};

// @desc    Get vacancies with filters
// @route   GET /api/vacancies
// @access  Public
export const getVacanciesWithFilters = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {minPrice, maxPrice} = req.query;
    let whereClause = {};

    if (minPrice || maxPrice) {
      whereClause = {
        price: {
          ...(minPrice && {$gte: minPrice}),
          ...(maxPrice && {$lte: maxPrice}),
        },
      };
    }

    const vacancies = await Shift.findAll({where: whereClause});
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch vacancies'});
  }
};

// @desc    Update vacancy
// @route   PUT /api/vacancies/:id
// @access  Public
export const updateVacancy = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const vacancy = await Shift.findByPk(req.params.id);
    if (!vacancy) {
      res.status(404).json({error: 'Vacancy not found'});
      return;
    }

    const {title, description, dates, type} = req.body;

    // Perform the same validations as in create
    if (!title || title.length > 100) {
      res.status(400).json({
        error: 'Title is required and must be less than 100 characters',
      });
      return;
    }

    if (description && description.length > 500) {
      res
        .status(400)
        .json({error: 'Description must be less than 500 characters'});
      return;
    }

    if (
      !dates ||
      !Array.isArray(dates) ||
      dates.length < 1 ||
      dates.length > 10
    ) {
      res.status(400).json({error: 'Must include between 1 and 10 dates'});
      return;
    }

    const validTypes = ['Consultation', 'Telephone', 'Ambulance'];
    if (!type || !validTypes.includes(type)) {
      res.status(400).json({error: 'Invalid type'});
      return;
    }

    await vacancy.update(req.body);
    res.json(vacancy);
  } catch (error) {
    res.status(500).json({error: 'Failed to update vacancy'});
  }
};

// @desc    Delete vacancy
// @route   DELETE /api/vacancies/:id
// @access  Public
export const deleteVacancy = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const vacancy = await Shift.findByPk(req.params.id);
    if (!vacancy) {
      res.status(404).json({error: 'Vacancy not found'});
      return;
    }

    await vacancy.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({error: 'Failed to delete vacancy'});
  }
};

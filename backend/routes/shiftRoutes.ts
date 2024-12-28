import express from 'express';
import {
  createVacancy,
  getVacanciesWithFilters,
  updateVacancy,
  deleteVacancy,
  getVacancyDetails,
} from '../controllers/shiftController';

const router = express.Router();

// Vacancy routes
router.post('/vacancy', createVacancy);
router.get('/vacancy/:id', getVacancyDetails);
router.get('/vacancies', getVacanciesWithFilters);
router.put('/vacancy/:id', updateVacancy);
router.delete('/vacancy/:id', deleteVacancy);

export default router;

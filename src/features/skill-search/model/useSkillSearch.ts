import { useMemo } from 'react';
import { getAllSkillsData } from '@/features/skill-search/data/skills';
import { searchSkills } from './searchSkills';

export const useSkillSearch = (query: string) => {
  // Читаем локально созданные навыки один раз при монтировании,
  // чтобы только что созданный навык сразу появлялся в каталоге.
  const allSkills = useMemo(() => getAllSkillsData(), []);

  const filteredSkills = useMemo(
    () => searchSkills(query, allSkills),
    [query, allSkills]
  );

  return {
    filteredSkills,
    isEmpty: filteredSkills.length === 0,
    isSearching: query.trim().length > 0,
    totalCount: allSkills.length,
  };
};
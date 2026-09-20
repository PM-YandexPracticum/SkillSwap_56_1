import { useMemo } from 'react';
import { SKILLS_DATA } from '@/features/skill-search/data/skills';
import { searchSkills } from './searchSkills';

export const useSkillSearch = (query: string) => {
  const filteredSkills = useMemo(
    () => searchSkills(query, SKILLS_DATA),
    [query]
  );

  return {
    filteredSkills,
    isEmpty: filteredSkills.length === 0,
    isSearching: query.trim().length > 0,
    totalCount: SKILLS_DATA.length,
  };
};
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [savedArticles, setSavedArticles] = useState({});
  const { user } = useAuth();

  const username = user?.username;

  const saveArticle = (article) => {
    if (!username) return;

    setSavedArticles(prev => {
      const userArticles = prev[username] || [];

      if (userArticles.find(a => a.url === article.url)) {
        return prev;
      }

      return {
        ...prev,
        [username]: [...userArticles, article]
      };
    });
  };

  const removeArticle = (url) => {
    if (!username) return;

    setSavedArticles(prev => ({
      ...prev,
      [username]: (prev[username] || []).filter(a => a.url !== url)
    }));
  };

  const isArticleSaved = (url) => {
    if (!username) return false;

    return (savedArticles[username] || []).some(a => a.url === url);
  };

  const getUserSavedArticles = () => {
    if (!username) return [];

    return savedArticles[username] || [];
  };

  const getAllUserArticles = () => {
    return savedArticles;
  };

  return (
    <ArticlesContext.Provider 
      value={{ 
        savedArticles, 
        saveArticle, 
        removeArticle, 
        isArticleSaved,
        getUserSavedArticles,
        getAllUserArticles
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};

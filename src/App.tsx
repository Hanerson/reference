import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BlogPost from './pages/BlogPost';

import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
    return (
        <Router>
            <ScrollToTop/>
            <div className="min-h-screen bg-white">
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/post/:id" element={<BlogPost />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
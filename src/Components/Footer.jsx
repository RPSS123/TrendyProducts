import React from 'react';

export default function Footer(){
return (
<footer className="bg-light py-3 mt-auto">
<div className="container text-center small text-muted">
© {new Date().getFullYear()} TrendyProducts
</div>
</footer>
);
}
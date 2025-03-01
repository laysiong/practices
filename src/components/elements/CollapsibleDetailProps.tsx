"use client"
import { useState } from 'react'

interface CollapsibleDetailProps {
  title: string;
  details: {
    label: string;
    value: string | React.ReactNode;
  }[];
  className?: string;
}

export default function CollapsibleDetail({ title, details, className }: CollapsibleDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="collapsible-panel">
        <div className={`collapsible-header ${className}`} onClick={() => setIsExpanded(!isExpanded)}>
            <span className="title">{title}</span>
            <span className={`material-symbols-outlined transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
            chevron_right
            </span>
        </div>
        
        {isExpanded && (
        <div className="collapsible-content">
            {details.map((detail, index) => (
                <div key={index} className="detail-row">
                    <div className="collapsible-label">{detail.label}</div>
                    <div className="collapsible-value">{detail.value}</div>
                </div>
            ))}
        </div>
        )}
    </div>
  );
}
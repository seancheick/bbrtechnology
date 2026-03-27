"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  items: TimelineItem[];
}

// --- Node Component ---
function TimelineNode({
  item,
  index,
  total,
  isExpanded,
  isRelated,
  onClick,
  containerSize,
}: {
  item: TimelineItem;
  index: number;
  total: number;
  isExpanded: boolean;
  isRelated: boolean;
  onClick: () => void;
  containerSize: number;
}) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = containerSize * 0.36;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const Icon = item.icon;

  return (
    <motion.button
      className={cn(
        "absolute z-10 flex cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        isExpanded
          ? "h-14 w-14 bg-gold-400 text-navy-950 border-gold-400 shadow-lg shadow-gold-400/30"
          : isRelated
            ? "h-12 w-12 border-amber-600/50 bg-amber-600/15 text-amber-600"
            : "h-11 w-11 border-border bg-bg-alt text-foreground hover:border-amber-600/50 hover:bg-[color:color-mix(in_srgb,var(--color-bg-alt)_80%,var(--color-gold-400)_20%)]"
      )}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200, damping: 20 }}
    >
      <Icon className={cn("h-5 w-5", isExpanded ? "h-6 w-6" : "")} />
    </motion.button>
  );
}

// --- Detail Card ---
function DetailCard({ item, onClose }: { item: TimelineItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
      <div
        className="pointer-events-auto w-72 rounded-2xl border border-border bg-bg/95 p-5 shadow-2xl backdrop-blur-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <item.icon className="h-5 w-5 text-gold-400" />
            <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-foreground">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-lg leading-none text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            &times;
          </button>
        </div>

        {/* Status badge */}
        <div className="mb-3">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border",
              item.status === "completed" && "border-amber-600/40 bg-bg-alt text-foreground",
              item.status === "in-progress" && "text-navy-950 bg-gold-400 border-navy-950",
              item.status === "pending" && "border-border bg-bg-alt text-foreground-muted"
            )}
          >
            {item.status === "completed"
              ? "Completed"
              : item.status === "in-progress"
                ? "In Progress"
                : "Pending"}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed text-foreground-muted">{item.content}</p>

        {/* Energy bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-foreground-subtle">Energy</span>
            <span className="text-xs font-medium text-gold-400">{item.energy}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-alt">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 to-gold-400"
              initial={{ width: 0 }}
              animate={{ width: `${item.energy}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Category */}
        <div className="mt-3 text-xs text-foreground-subtle">{item.category}</div>
      </div>
    </motion.div>
  );
}

// --- Main Component ---
export function RadialOrbitalTimeline({ items }: RadialOrbitalTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(420);

  // Responsive container size
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerSize(Math.min(width, 500));
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Slow background rotation when nothing is expanded
  useEffect(() => {
    if (expandedId !== null) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3);
    }, 50);
    return () => clearInterval(interval);
  }, [expandedId]);

  const expandedItem = useMemo(
    () => items.find((item) => item.id === expandedId) ?? null,
    [items, expandedId]
  );

  const relatedIds = useMemo(
    () => (expandedItem ? new Set(expandedItem.relatedIds) : new Set<number>()),
    [expandedItem]
  );

  const handleNodeClick = useCallback(
    (id: number) => {
      setExpandedId((prev) => (prev === id ? null : id));
    },
    []
  );

  const orbitRadius = containerSize * 0.36;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-border bg-bg"
      style={{ height: containerSize }}
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          width: containerSize * 0.5,
          height: containerSize * 0.5,
          background: "radial-gradient(circle, #fbbf24 0%, #d97706 50%, transparent 70%)",
        }}
      />

      {/* Orbit ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/80"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
        }}
      />

      {/* Second subtle orbit ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/40"
        style={{
          width: orbitRadius * 2.5,
          height: orbitRadius * 2.5,
        }}
      />

      {/* Center gradient core */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        animate={{ rotate: rotation }}
        transition={{ duration: 0 }}
      >
        <div
          className="rounded-full bg-gradient-to-br from-amber-600 via-gold-400 to-amber-600 opacity-30"
          style={{ width: containerSize * 0.15, height: containerSize * 0.15 }}
        />
      </motion.div>

      {/* Center label */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-600 to-gold-400 flex items-center justify-center shadow-lg shadow-amber-600/20">
          <span className="font-[family-name:var(--font-display)] text-sm font-extrabold text-navy-950">
            B&Br
          </span>
        </div>
      </div>

      {/* Connecting lines from center to nodes */}
      <svg
        className="absolute inset-0 z-[1]"
        width={containerSize}
        height={containerSize}
        viewBox={`0 0 ${containerSize} ${containerSize}`}
        style={{ pointerEvents: "none" }}
      >
        {items.map((item, index) => {
          const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2;
          const cx = containerSize / 2;
          const cy = containerSize / 2;
          const endX = cx + Math.cos(angle) * orbitRadius;
          const endY = cy + Math.sin(angle) * orbitRadius;
          const isRelatedOrExpanded = expandedId === item.id || relatedIds.has(item.id);

          return (
            <line
              key={item.id}
              x1={cx}
              y1={cy}
              x2={endX}
              y2={endY}
              stroke={isRelatedOrExpanded ? "#fbbf24" : "var(--color-border)"}
              strokeWidth={isRelatedOrExpanded ? 1.5 : 0.5}
              strokeDasharray={isRelatedOrExpanded ? "none" : "4 4"}
              strokeOpacity={isRelatedOrExpanded ? 0.8 : 0.65}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {items.map((item, index) => (
        <TimelineNode
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          isExpanded={expandedId === item.id}
          isRelated={relatedIds.has(item.id)}
          onClick={() => handleNodeClick(item.id)}
          containerSize={containerSize}
        />
      ))}

      {/* Detail card overlay */}
      <AnimatePresence>
        {expandedItem && (
          <DetailCard
            item={expandedItem}
            onClose={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

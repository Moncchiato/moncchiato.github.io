// Layer content data - This is where you'll add the detailed content for each clickable layer
const layerContent = {
    'relationships': {
        title: 'Relationships',
        content: `
            <p><strong>Overview:</strong> The Relationships layer encompasses all aspects of interpersonal connections and social bonds.</p>
            
            <h3>Components within this layer:</h3>
            <ul>
                <li><strong>Relationship Understanding:</strong> Cognitive and emotional capacity to comprehend relationship dynamics</li>
                <li><strong>Relationship Skills:</strong> Practical abilities for forming and maintaining relationships</li>
                <li><strong>Sex & Intimacy:</strong> Physical and emotional aspects of intimate connections</li>
                <li><strong>Types of Love:</strong> Understanding different forms and expressions of love</li>
            </ul>
            
            <h3>Treatment Applications:</h3>
            <p>This layer focuses on improving clients' capacity for healthy interpersonal relationships through skill development, understanding patterns, and addressing intimacy needs.</p>
            
            <p><em>Add your detailed content about the Relationships layer here...</em></p>
        `
    },
    'purpose': {
        title: 'Purpose',
        content: `
            <p><strong>Overview:</strong> The Purpose layer addresses meaning-making, future orientation, and contribution to others.</p>
            
            <h3>Components within this layer:</h3>
            <ul>
                <li><strong>Agency Over Future:</strong> Belief in control and influence over future outcomes</li>
                <li><strong>Looking Forward to Experiences:</strong> Capacity to anticipate positive future events</li>
                <li><strong>Purpose to Others:</strong> Sense of contributing meaningfully to others' lives</li>
            </ul>
            
            <h3>Treatment Applications:</h3>
            <p>This layer helps clients develop a sense of purpose, agency, and meaning in their lives, which are crucial for mental health and wellbeing.</p>
            
            <p><em>Add your detailed content about the Purpose layer here...</em></p>
        `
    },
    'allostatic-load': {
        title: 'Allostatic Load',
        content: `
            <p><strong>Overview:</strong> The Allostatic Load layer represents the cumulative burden of stress and physiological responses to chronic challenges.</p>
            
            <h3>Components within this layer:</h3>
            <ul>
                <li><strong>Dopamine System:</strong> Neurotransmitter system involved in reward and motivation</li>
                <li><strong>Autonomic Nervous System:</strong> Automatic physiological responses to stress</li>
                <li><strong>Catacholamines:</strong> Stress hormones (epinephrine, norepinephrine)</li>
                <li><strong>Managing Dopamine System:</strong> Regulation of reward and motivation systems</li>
            </ul>
            
            <h3>Treatment Applications:</h3>
            <p>This layer addresses the physiological impacts of chronic stress and works to manage allostatic load through various interventions targeting stress response systems.</p>
            
            <p><em>Add your detailed content about the Allostatic Load layer here...</em></p>
        `
    },
    'cognitions': {
        title: 'Cognitions/Beliefs/Schemas',
        content: `
            <p><strong>Overview:</strong> The Cognitions/Beliefs/Schemas layer encompasses thought patterns, beliefs, cognitive frameworks, and learning processes.</p>
            
            <h3>Components within this layer:</h3>
            <ul>
                <li><strong>Acceptance:</strong> Acknowledging and embracing reality as it is</li>
                <li><strong>Commitment/Locus of Control:</strong> Belief in personal control and goal commitment</li>
                <li><strong>Beliefs/Education/Experience/Language:</strong> Cognitive frameworks and knowledge structures</li>
                <li><strong>Cognitive Distortions:</strong> Systematic errors in thinking patterns</li>
                <li><strong>Attention Regulation:</strong> Control and direction of attention</li>
                <li><strong>Respondent Conditioning:</strong> Learned associations and conditioned responses</li>
            </ul>
            
            <h3>Treatment Applications:</h3>
            <p>This layer is central to cognitive-behavioral interventions, addressing maladaptive thought patterns, developing cognitive flexibility, and restructuring beliefs and schemas.</p>
            
            <p><em>Add your detailed content about the Cognitions/Beliefs/Schemas layer here...</em></p>
        `
    },
    'metabolic-health': {
        title: 'Metabolic Health',
        content: `
            <p><strong>Overview:</strong> The Metabolic Health layer encompasses physical health factors that significantly impact psychological functioning.</p>
            
            <h3>Components within this layer:</h3>
            <ul>
                <li><strong>Gut Microbiome Probiotics/Prebiotics:</strong> Intestinal health and microbiome balance</li>
                <li><strong>Content of Food:</strong> Nutritional quality and dietary patterns</li>
                <li><strong>Refined Sugars/Fructose Consumption:</strong> Impact of processed sugars on health</li>
                <li><strong>Substance Use:</strong> Consumption of substances affecting physiology</li>
                <li><strong>Inflammation:</strong> Systemic inflammatory processes</li>
                <li><strong>Physical Activity:</strong> Exercise and movement patterns</li>
                <li><strong>Sleep:</strong> Sleep quality and quantity</li>
                <li><strong>Circadian Rhythm:</strong> Biological timing and sleep-wake cycles</li>
            </ul>
            
            <h3>Treatment Applications:</h3>
            <p>This foundational layer addresses the physical health factors that create the biological substrate for mental health. Interventions here can significantly impact overall treatment outcomes.</p>
            
            <p><em>Add your detailed content about the Metabolic Health layer here...</em></p>
        `
    }
};

// DOM Elements
const modal = document.getElementById('nodeModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to polygon hotspots (TTIM 3)
    document.querySelectorAll('.hotspot-poly').forEach(poly => {
        poly.addEventListener('click', function() {
            const layerId = this.getAttribute('data-layer');
            showLayerDetails(layerId);
        });
    });

    // Keep global navigation arrows updated (hide at bounds)
    const scroller = document.querySelector('.fullpage');
    function updateGlobalNavVisibility() {
        const leftBtn = document.querySelector('.global-nav .arrow-btn.left');
        const rightBtn = document.querySelector('.global-nav .arrow-btn.right');
        const sections = getSections();
        const idx = getCurrentIndex();
        if (leftBtn) leftBtn.style.display = idx === 0 ? 'none' : '';
        if (rightBtn) rightBtn.style.display = idx === sections.length - 1 ? 'none' : '';
    }

    // Call on load and when scroller moves
    updateGlobalNavVisibility();
    if (scroller) {
        let scrollDebounce;
        scroller.addEventListener('scroll', function() {
            clearTimeout(scrollDebounce);
            scrollDebounce = setTimeout(updateGlobalNavVisibility, 80);
        });
    }

    // Close modal when clicking the X
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

// Hotspot coordinate helper: shift+click on the inlined TTIM3 svg to log viewBox coordinates
document.addEventListener('DOMContentLoaded', function() {
    const svgEl = document.querySelector('.image-stage.interactive .ttim-svg');
    if (!svgEl) return;
    // Listen on the parent stage so clicks on top of the svg still register
    svgEl.parentElement.addEventListener('click', function(e) {
        if (!e.shiftKey) return; // only when Shift is pressed
        const svg = svgEl;
        const rect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;
        const x = ((e.clientX - rect.left) / rect.width) * viewBox.width + viewBox.x;
        const y = ((e.clientY - rect.top) / rect.height) * viewBox.height + viewBox.y;
        console.info(`HOTSPOT_HELPER: viewBox coords: ${x.toFixed(1)},${y.toFixed(1)} (Shift+Click)`);
        // Visual marker
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        marker.setAttribute('cx', x);
        marker.setAttribute('cy', y);
        marker.setAttribute('r', 8);
        marker.setAttribute('fill', 'rgba(255,64,129,0.9)');
        marker.setAttribute('stroke', '#fff');
        marker.setAttribute('stroke-width', '2');
        svg.appendChild(marker);
        setTimeout(() => marker.remove(), 1200);
    });
});

// Function to show layer details
function showLayerDetails(layerId) {
    const layerData = layerContent[layerId];
    
    if (layerData) {
        modalTitle.textContent = layerData.title;
        modalBody.innerHTML = layerData.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
        // Fallback for layers without content yet
        modalTitle.textContent = 'Layer Information';
        modalBody.innerHTML = `
            <p>Detailed information for this layer is being prepared.</p>
            <p>Please check back soon for comprehensive content about this aspect of the Treatment Target Identification Model.</p>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Function to add new layer content (for future use)
function addLayerContent(layerId, title, content) {
    layerContent[layerId] = {
        title: title,
        content: content
    };
}

// Export functions for potential future use
// Section navigation (arrows)
function getSections() {
    return Array.from(document.querySelectorAll('.screen'));
}

function getCurrentIndex() {
    const sections = getSections();
    const scroller = document.querySelector('.fullpage');
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let currentIdx = 0;
    let minDist = Infinity;
    sections.forEach((sec, idx) => {
        const mid = sec.offsetLeft + sec.offsetWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < minDist) { minDist = dist; currentIdx = idx; }
    });
    return currentIdx;
}

function navigate(dir) {
    const sections = getSections();
    const current = getCurrentIndex();
    const target = dir === 'next' ? Math.min(sections.length - 1, current + 1)
                                  : Math.max(0, current - 1);
    sections[target].scrollIntoView({ behavior: 'smooth', inline: 'start' });
}

// Global nav buttons
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.global-nav .arrow-btn');
    if (!btn) return;
    navigate(btn.getAttribute('data-dir'));
});

// Keyboard arrows
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') navigate('next');
    if (e.key === 'ArrowLeft') navigate('prev');
});

// Translate vertical wheel to horizontal scroll for the fullpage container
document.addEventListener('DOMContentLoaded', function() {
    const scroller = document.querySelector('.fullpage');
    if (!scroller) return;
    scroller.addEventListener('wheel', function(e) {
        // Map vertical wheel to horizontal navigation between snaps
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            navigate(e.deltaY > 0 ? 'next' : 'prev');
            e.preventDefault();
        }
    }, { passive: false });
});

window.TTIM = {
    showLayerDetails,
    closeModal,
    addLayerContent,
    layerContent
};

// --- Load TTIM3 SVG XML at runtime and wire hotspots ---
(function loadAndAnnotateTTIM3(){
    const container = document.getElementById('ttim3-svg-container');
    if (!container) return;

    // Mapping of SVG group ids to logical layer keys in layerContent
    const idMap = {
        // existing group ids (kept for compatibility)
        'g2517': 'cognitions',
        'g2077': 'relationships',
        'g2364': 'relationships',
        'g2570': 'allostatic-load',
        'g2758': 'purpose',
        'g2785': 'purpose',
        'g1962': 'metabolic-health',
        'g2323': 'metabolic-health',
        // controllers (g vectors) as requested by user
        'g2962': 'metabolic-health',
        'g2964': 'relationships',
        'g2965': 'allostatic-load',
        'g2966': 'purpose'
    };

    // Partner/grouping map: controller id (can be a path or g id) -> array of partner gids
    const partnerMap = {
        // Map controllers to their title/label partner ids
        'g2964': ['g2363'],        // Relationships -> title g2363
        'g2966': ['g2784'],        // Purpose -> title g2784
        'g2962': ['g2322'],        // Metabolic -> title g2322
        'g2517': ['g2516'],        // Cognitions -> title g2516
        'g2965': ['g2569'],        // Allostatic Load -> title g2569
        // keep older mappings for compatibility
        'g2077': ['g2364'],
        'g2758': ['g2785', 'g2323']
    };
    // reverse lookup: set of partner gids
    const partnersSet = new Set();
    Object.values(partnerMap).forEach(arr => arr.forEach(id => partnersSet.add(id)));

    // Which specific controller IDs are allowed to show popouts. We'll disable
    // popups/clones for all other path/g ids so we can restart from a minimal set.
    // Allow five specific controller g ids to be interactive
    const ALLOWED_CONTROLLERS = new Set(['g2517','g2965','g2962','g2964','g2966']);

    // Feature flag: enable opening the modal on click/keyboard for controllers
    const ENABLE_LAYER_MODAL = true;

    // Layers for which we will use a clone-overlay to animate popouts instead of
    // toggling the original DOM nodes (this avoids coordinate-anchor snapping).
    // Limit this to the logical layers of the allowed controllers so only those
    // controllers get hit-proxies and clone overlays.
    // Keep hit-proxies only for layers that benefited from larger hit areas previously
    const proxyLayers = ['metabolic-health','relationships'];

    // Front-map: which specific g### text/vector ids should be brought to front
    // when a layer is activated. Keys are logical layer keys.
    const frontMap = {
        'metabolic-health': ['g2322'],
        'relationships': ['g2363'],
        'purpose': ['g2784'],
        'cognitions': ['g2516'],
        'allostatic-load': ['g2569']
    };

    fetch('TTIM3-PlainXML.txt')
        .then(r => {
            if (!r.ok) throw new Error('Failed to fetch TTIM3-PlainXML.txt');
            return r.text();
        })
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'image/svg+xml');
            const svg = doc.querySelector('svg');
            if (!svg) {
                console.error('TTIM3: no <svg> found in TTIM3-PlainXML.txt');
                container.textContent = 'Interactive visual unavailable';
                return;
            }

            // Import node from parsed document into current document to avoid namespace issues
            const imported = document.importNode(svg, true);

            // Ensure class / styling on the imported SVG
            imported.classList.add('ttim-svg');
            imported.setAttribute('preserveAspectRatio', imported.getAttribute('preserveAspectRatio') || 'xMidYMid meet');

            // Annotate groups and attach event listeners on the imported SVG
            const originalSibling = new Map();
            // Also ensure we capture original sibling positions for partner/front elements
            // so we can restore DOM order after bringing them to front.
            // timers to debounce pointerleave events to prevent flicker when transforms shift hit-testing
            const leaveTimers = new Map();
            // Capture original sibling for partner/front ids so we can restore their
            // original DOM order after any temporary bring-to-front operations.
            (function captureExtraOriginalSibling() {
                const extraIds = new Set();
                Object.values(partnerMap).forEach(arr => arr.forEach(id => extraIds.add(id)));
                Object.values(frontMap).forEach(arr => arr.forEach(id => extraIds.add(id)));
                extraIds.forEach(id => {
                    const el = imported.getElementById(id);
                    if (el && !originalSibling.has(id)) originalSibling.set(id, el.nextSibling);
                });
            })();

            Object.entries(idMap).forEach(([gid, layerKey]) => {
                const g = imported.getElementById(gid);
                if (!g) {
                    console.warn('TTIM3: group not found in imported SVG:', gid);
                    return;
                }
                // If this gid is a partner/title vector, explicitly remove interactive attributes
                // and mark it as a partner so it won't be keyboard-focusable or act as its own button.
                if (partnersSet.has(gid)) {
                    g.removeAttribute('role');
                    g.removeAttribute('tabindex');
                    // mark as partner for styling/debugging and tie to its controller
                    g.classList.add('ttim-partner');
                    const controllerId = Object.keys(partnerMap).find(k => (partnerMap[k] || []).includes(gid));
                    if (controllerId) g.setAttribute('data-partner-of', controllerId);
                    // hide from accessibility tree as it's not an independent control
                    g.setAttribute('aria-hidden', 'true');
                    // Do not add interactive listeners for partner/title vectors; they'll be
                    // activated when their controller is hovered/clicked.
                    return; // skip the rest of the loop for this partner gid
                }
                // For controllers: only make interactive those explicitly allowed. For all
                // other controllers, mark as non-interactive and skip adding listeners.
                if (!ALLOWED_CONTROLLERS.has(gid)) {
                    // ensure it's not keyboard-focusable or announced as a control
                    g.removeAttribute('role');
                    g.removeAttribute('tabindex');
                    g.setAttribute('aria-hidden', 'true');
                    g.classList.add('ttim-non-interactive');
                    // do not set data-layer for non-interactive controllers to avoid
                    // accidental CSS/JS hooks elsewhere
                    if (g.hasAttribute('data-layer')) g.removeAttribute('data-layer');
                    return;
                }
                // Only set data-layer on allowed interactive controllers
                g.setAttribute('data-layer', layerKey);
                // Otherwise this is a controller / interactive group
                g.setAttribute('tabindex', '0');
                g.setAttribute('role', 'button');
                const label = (layerContent[layerKey] && layerContent[layerKey].title) ? layerContent[layerKey].title : layerKey;
                g.setAttribute('aria-label', label);
                g.classList.add('clickable-layer');

                // No special-case wrapping for Cognitions; treat like others

                // Save original nextSibling so we can restore DOM order later
                originalSibling.set(gid, g.nextSibling);

                // Toggle active state on pointer/focus without reparenting to avoid coordinate jumps
                // Use pointerenter so we can inspect the pointer position for the metabolic group
                g.addEventListener('pointerenter', (e) => {
                    try {
                        // cancel any pending leave timer for this group
                        const existing = leaveTimers.get(gid);
                        if (existing) {
                            clearTimeout(existing);
                            leaveTimers.delete(gid);
                        }
                        // Cognitions handled like other layers (CSS scale on .active)
                        // For metabolic-health, only trigger when pointer is in the bottom half
                        if (layerKey === 'metabolic-health' && e && e.clientY !== undefined) {
                            const rect = g.getBoundingClientRect();
                            if (e.clientY < rect.top + rect.height / 2) {
                                // pointer is in top half - do not activate
                                return;
                            }
                        }
                        // For proxyLayers use show/hide handler; others activate in-place.
                        if (proxyLayers.includes(layerKey)) {
                            showCloneForGroup(gid, layerKey);
                        } else {
                            g.classList.add('active');
                        }
                        // Also activate any partner gids attached to this controller (do not reparent partners)
                        const partners = partnerMap[gid] || [];
                        partners.forEach(pid => {
                            const p = imported.getElementById(pid);
                            if (p) {
                                // partners are small title vectors; for proxyLayers we also
                                // show a clone if needed, otherwise toggle active class
                                if (proxyLayers.includes(layerKey)) p.classList.add('active');
                                else p.classList.add('active');
                            }
                        });
                        // Bring any configured front elements for this logical layer to the front.
                        // We use explicit ids (frontMap) so small text vectors can be moved without
                        // reparenting the entire visual that might have tricky transforms.
                        const frontIds = frontMap[layerKey] || [];
                        frontIds.forEach(fid => {
                            const el = imported.getElementById(fid);
                            if (el && el.parentNode) el.parentNode.appendChild(el);
                        });
                    } catch (err) {
                        // ignore
                    }
                });

                // Keyboard focus should still show the popout
                g.addEventListener('focus', () => {
                    // cancel any pending leave timer
                    const existing = leaveTimers.get(gid);
                    if (existing) { clearTimeout(existing); leaveTimers.delete(gid); }
                    // Cognitions uses same .active CSS scale as others
                    if (proxyLayers.includes(layerKey)) showCloneForGroup(gid, layerKey);
                    else g.classList.add('active');
                });

                // Debounced removal of active on pointerleave to avoid flicker as transforms change geometry
                g.addEventListener('pointerleave', () => {
                    // start a short timer; if pointer re-enters quickly we'll cancel it
                    const t = setTimeout(() => {
                        // No special-case cleanup for Cognitions
                        if (proxyLayers.includes(layerKey)) hideCloneForGroup(gid);
                        else g.classList.remove('active');
                        // also remove active from partners
                        const partners = partnerMap[gid] || [];
                        partners.forEach(pid => {
                            const p = imported.getElementById(pid);
                            if (p) p.classList.remove('active');
                        });
                        // attempt to restore original position for any front elements we moved
                        try {
                            const frontIds = frontMap[layerKey] || [];
                            frontIds.forEach(fid => {
                                const el = imported.getElementById(fid);
                                const parent = el && el.parentNode;
                                const next = originalSibling.get(fid);
                                if (el && parent) {
                                    if (next && next.parentNode === parent) parent.insertBefore(el, next);
                                    else parent.appendChild(el);
                                }
                            });
                        } catch (err) {}
                        leaveTimers.delete(gid);
                    }, 140);
                    leaveTimers.set(gid, t);
                });

                // blur (keyboard) can immediately remove
                g.addEventListener('blur', () => {
                    const existing = leaveTimers.get(gid);
                    if (existing) { clearTimeout(existing); leaveTimers.delete(gid); }
                    // No special-case cleanup for Cognitions
                    if (proxyLayers.includes(layerKey)) hideCloneForGroup(gid);
                    else g.classList.remove('active');
                });

                // Click/tap would open modal (skip when disabled)
                if (!partnersSet.has(gid) && ENABLE_LAYER_MODAL) {
                    g.addEventListener('click', ev => {
                        ev.stopPropagation();
                        if (layerKey === 'metabolic-health' && ev && ev.clientY !== undefined) {
                            const rect = g.getBoundingClientRect();
                            if (ev.clientY < rect.top + rect.height / 2) return;
                        }
                        showLayerDetails(layerKey);
                    });
                }

                // Keyboard activation (skip partners); disabled when modal is off
                if (!partnersSet.has(gid) && ENABLE_LAYER_MODAL) {
                    g.addEventListener('keydown', ev => {
                        if (ev.key === 'Enter' || ev.key === ' ') {
                            ev.preventDefault();
                            showLayerDetails(layerKey);
                        }
                    });
                }
            });

            // When pointer leaves the imported SVG entirely, remove all active classes and try to restore order
            imported.addEventListener('pointerout', (e) => {
                // only act when pointer left the SVG (not when moving between children)
                if (e.relatedTarget && imported.contains(e.relatedTarget)) return;
                imported.querySelectorAll('[data-layer].active').forEach(g => g.classList.remove('active'));
                // restore order for any elements we recorded (controllers, partners, front elements)
                originalSibling.forEach((next, gid) => {
                    try {
                        const g = imported.getElementById(gid);
                        if (!g) return;
                        const parent = g.parentNode;
                        if (!parent) return;
                        if (next && next.parentNode === parent) parent.insertBefore(g, next);
                        else parent.appendChild(g);
                    } catch (err) {
                        // ignore restore errors
                    }
                });
            });

            // (overlay + hit-proxy will be created after the imported SVG is inserted)

            // Touch: toggle active class on first tap (so users can see popout), open modal on second
            imported.addEventListener('pointerdown', (e) => {
                if (e.pointerType !== 'touch') return;
                const g = e.target.closest && e.target.closest('[data-layer]');
                if (!g) return;
                if (!g.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();
                    imported.querySelectorAll('[data-layer].active').forEach(x => x.classList.remove('active'));
                    g.classList.add('active');
                    const onDoc = (ev) => {
                        if (!ev.target.closest || !ev.target.closest('[data-layer]')) {
                            g.classList.remove('active');
                            document.removeEventListener('pointerdown', onDoc);
                        }
                    };
                    document.addEventListener('pointerdown', onDoc);
                }
            });

            // Insert into container
            container.innerHTML = ''; // clear loader
            container.appendChild(imported);

            // --- Now create the overlay and hit-proxies AFTER the imported SVG is in the DOM ---
            // Create a top-layer SVG overlay that will host cloned visuals for proxyLayers
            const overlay = (function createOverlay() {
                const ov = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                ov.setAttribute('class', 'ttim-clone-overlay');
                const vb = imported.getAttribute('viewBox') || imported.viewBox && `${imported.viewBox.baseVal.x} ${imported.viewBox.baseVal.y} ${imported.viewBox.baseVal.width} ${imported.viewBox.baseVal.height}`;
                if (vb) ov.setAttribute('viewBox', vb);
                ov.setAttribute('preserveAspectRatio', imported.getAttribute('preserveAspectRatio') || 'xMidYMid meet');
                ov.setAttribute('aria-hidden', 'true');
                container.appendChild(ov);
                return ov;
            })();

            const activeClones = new Map();
            // Dev flag: enable detailed clone transform logging and pixel-fallback when
            // DOMMatrix mapping looks suspicious. Set to true during debugging, false for normal use.
            const CLONE_DEBUG = true;
            // Force the pixel-based fallback for specific logical layers that are fragile
            // due to inline transforms or complex group nesting. Add layer keys here to
            // bypass the DOMMatrix method and use boundingClientRect -> viewBox mapping.
            const ALWAYS_PIXEL_FALLBACK = new Set(['purpose', 'cognitions', 'allostatic-load']);

            // Simplified: toggle class on original for proxy areas too (no overlay clones)
            function showCloneForGroup(gid, layerKey) {
                if (activeClones.has(gid)) return;
                const target = imported.getElementById(gid);
                if (!target) return;
                try {
                    target.classList.add('active');
                    const partners = partnerMap[gid] || [];
                    partners.forEach(pid => {
                        const p = imported.getElementById(pid);
                        if (p) p.classList.add('active');
                    });
                    const frontIds = frontMap[layerKey] || [];
                    frontIds.forEach(fid => {
                        const el = imported.getElementById(fid);
                        if (el && el.parentNode) el.parentNode.appendChild(el);
                    });
                    activeClones.set(gid, null);
                } catch (err) {
                    // ignore
                }
            }

            function hideCloneForGroup(gid) {
                try {
                    const target = imported.getElementById(gid);
                    if (target) target.classList.remove('active');
                    const partners = partnerMap[gid] || [];
                    partners.forEach(pid => {
                        const p = imported.getElementById(pid);
                        if (p) p.classList.remove('active');
                    });
                    const frontIds = frontMap[idMap[gid]] || [];
                    frontIds.forEach(fid => {
                        try {
                            const el = imported.getElementById(fid);
                            const parent = el && el.parentNode;
                            const next = originalSibling.get(fid);
                            if (el && parent) {
                                if (next && next.parentNode === parent) parent.insertBefore(el, next);
                                else parent.appendChild(el);
                            }
                        } catch (err) {}
                    });
                    activeClones.delete(gid);
                } catch (err) {
                    // ignore
                }
            }

            // Recompute transforms for active clones on window resize (viewport/layout changes)
            window.addEventListener('resize', () => {
                activeClones.forEach((clone, gid) => {
                    try {
                        const target = imported.getElementById(gid);
                        if (!target || !clone) return;
                        const tCTM = target.getScreenCTM();
                        const oCTM = overlay.getScreenCTM();
                        if (tCTM && oCTM) {
                            const tMat = new DOMMatrix([tCTM.a, tCTM.b, tCTM.c, tCTM.d, tCTM.e, tCTM.f]);
                            const oMat = new DOMMatrix([oCTM.a, oCTM.b, oCTM.c, oCTM.d, oCTM.e, oCTM.f]);
                            const invO = oMat.inverse();
                            const m = invO.multiply(tMat);
                            clone.setAttribute('transform', 'matrix(' + [m.a, m.b, m.c, m.d, m.e, m.f].join(' ') + ')');
                        }
                    } catch (err) {
                        // ignore
                    }
                });
            });

            // Hit-proxy overlay: invisible rects that capture pointer events for certain layers
            const hitProxyGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            hitProxyGroup.setAttribute('class', 'ttim-hit-proxies');
            proxyLayers.forEach(layerKey => {
                Object.entries(idMap).forEach(([gid, lk]) => {
                    if (lk !== layerKey) return;
                    if (partnersSet.has(gid)) return; // proxies on controllers only
                    // Only create hit-proxies for controllers we explicitly allow
                    if (!ALLOWED_CONTROLLERS.has(gid)) return;
                    const target = imported.getElementById(gid);
                    if (!target) return;
                    try {
                        const bbox = target.getBBox();
                        const pad = Math.max(4, Math.min(bbox.width, bbox.height) * 0.06);
                        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        rect.setAttribute('x', bbox.x - pad);
                        // For metabolic-health, restrict proxy to bottom half to avoid overlap
                        if (layerKey === 'metabolic-health') {
                            const halfY = bbox.y + (bbox.height / 2);
                            rect.setAttribute('y', halfY);
                            rect.setAttribute('height', (bbox.height / 2) + pad);
                        } else {
                            rect.setAttribute('y', bbox.y - pad);
                            rect.setAttribute('height', bbox.height + pad * 2);
                        }
                        rect.setAttribute('width', bbox.width + pad * 2);
                        rect.setAttribute('fill', 'transparent');
                        rect.setAttribute('data-target-gid', gid);
                        rect.setAttribute('data-layer', layerKey);
                        rect.classList.add('ttim-hit-proxy');

                        // pointerenter/leave toggle the clone overlay for proxy layers
                        rect.addEventListener('pointerenter', (e) => {
                            // cancel any pending leave timer
                            const existing = leaveTimers.get(gid);
                            if (existing) { clearTimeout(existing); leaveTimers.delete(gid); }
                            const g = imported.getElementById(gid);
                            if (!g) return;
                            showCloneForGroup(gid, layerKey);
                            // Also activate partners visually (partners are small title vectors)
                            const partners = partnerMap[gid] || [];
                            partners.forEach(pid => {
                                const p = imported.getElementById(pid);
                                if (p) p.classList.add('active');
                            });
                            // Bring configured front elements to front for this logical layer
                            const frontIds = frontMap[layerKey] || [];
                            frontIds.forEach(fid => {
                                const el = imported.getElementById(fid);
                                if (el && el.parentNode) el.parentNode.appendChild(el);
                            });
                        });
                        rect.addEventListener('pointerleave', (e) => {
                            // debounce to prevent flicker while transforms change geometry
                            const t = setTimeout(() => {
                                const g = imported.getElementById(gid);
                                if (!g) return;
                                hideCloneForGroup(gid);
                                const partners = partnerMap[gid] || [];
                                partners.forEach(pid => {
                                    const p = imported.getElementById(pid);
                                    if (p) p.classList.remove('active');
                                });
                                // restore front elements order
                                const frontIds = frontMap[layerKey] || [];
                                frontIds.forEach(fid => {
                                    try {
                                        const el = imported.getElementById(fid);
                                        const parent = el && el.parentNode;
                                        const next = originalSibling.get(fid);
                                        if (el && parent) {
                                            if (next && next.parentNode === parent) parent.insertBefore(el, next);
                                            else parent.appendChild(el);
                                        }
                                    } catch (err) {}
                                });
                                leaveTimers.delete(gid);
                            }, 120);
                            leaveTimers.set(gid, t);
                        });
                        if (ENABLE_LAYER_MODAL) {
                            rect.addEventListener('click', (e) => {
                                e.stopPropagation();
                                showLayerDetails(layerKey);
                            });
                        }

                        hitProxyGroup.appendChild(rect);
                    } catch (err) {
                        console.warn('TTIM3: could not create hit-proxy for', gid, err);
                    }
                });
            });
            // append proxies on top of artwork so they receive pointer events
            imported.appendChild(hitProxyGroup);

            // Re-run shift+click helper binding in case it ran earlier
            ensureShiftClickHelper();
        })
        .catch(err => {
            console.error('TTIM3 load error:', err);
            container.textContent = 'Failed to load interactive visual';
        });

    // Helper: ensure shift+click hotspot helper is bound (used for authoring)
    function ensureShiftClickHelper() {
        const svgEl = document.querySelector('.image-stage.interactive .ttim-svg');
        if (!svgEl) return;
        const parent = svgEl.parentElement;
        if (!parent || parent.__hotspotHelperBound) return;
        parent.__hotspotHelperBound = true;
        parent.addEventListener('click', function (e) {
            if (!e.shiftKey) return;
            const svg = svgEl;
            const rect = svg.getBoundingClientRect();
            const viewBox = svg.viewBox.baseVal;
            const x = ((e.clientX - rect.left) / rect.width) * viewBox.width + viewBox.x;
            const y = ((e.clientY - rect.top) / rect.height) * viewBox.height + viewBox.y;
            console.info(`HOTSPOT_HELPER: viewBox coords: ${x.toFixed(1)},${y.toFixed(1)} (Shift+Click)`);
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            marker.setAttribute('cx', x);
            marker.setAttribute('cy', y);
            marker.setAttribute('r', 8);
            marker.setAttribute('fill', 'rgba(255,64,129,0.9)');
            marker.setAttribute('stroke', '#fff');
            marker.setAttribute('stroke-width', '2');
            svg.appendChild(marker);
            setTimeout(() => marker.remove(), 1200);
        });
    }

})();

(() => {
  const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d', {alpha: true});

  const MAX_DPR = 1.6;
  const STAR_DENSITY = 0.000095;
  const NODE_DENSITY = 0.000018;
  const MAX_STARS = 182;
  const MAX_NODES = 30;
  const ASTEROID_COUNT = 7;
  const LINK_DISTANCE = 178;
  const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;
  let running = true;
  let lastTime = 0;
  const pointer = {x: 0, y: 0, tx: 0, ty: 0, active: false};

  const farStars = [];
  const nearStars = [];
  const asteroids = [];
  const nodes = [];

  const STAR_TINTS = [
    [225, 234, 255],
    [203, 223, 255],
    [245, 240, 228],
  ];

  const ASTEROID_TINTS = [
    [86, 99, 124],
    [75, 84, 110],
    [93, 84, 117],
  ];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function rgba(rgb, a) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;

    initFarStars();
    initNearStars();
    initNodes();
    initAsteroids();
  }

  function initFarStars() {
    farStars.length = 0;
    const area = width * height;
    const count = clamp(Math.floor(area * STAR_DENSITY), 50, MAX_STARS);

    for (let i = 0; i < count; i += 1) {
      farStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.85 ? 1 : 2,
        alpha: rand(0.28, 0.66),
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: rand(0.25, 0.62),
        tint: pick(STAR_TINTS),
      });
    }
  }

  function initNearStars() {
    nearStars.length = 0;
    const count = clamp(Math.floor(farStars.length * 0.25), 12, 40);

    for (let i = 0; i < count; i += 1) {
      nearStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 2,
        alpha: rand(0.24, 0.46),
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: rand(0.16, 0.34),
        tint: pick(STAR_TINTS),
      });
    }
  }

  function initNodes() {
    nodes.length = 0;
    const area = width * height;
    const count = clamp(Math.floor(area * NODE_DENSITY), 13, MAX_NODES);

    for (let i = 0; i < count; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-8, 8),
        vy: rand(-8, 8),
        radius: rand(1.3, 2.2),
        glow: rand(0.4, 0.68),
      });
    }
  }

  function initAsteroids() {
    asteroids.length = 0;

    for (let i = 0; i < ASTEROID_COUNT; i += 1) {
      const isMeteor = Math.random() < 0.25;
      const scale = isMeteor ? rand(0.9, 1.2) : rand(0.6, 1.1);
      asteroids.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-6.5, -2.4),
        vy: rand(0.35, 1.2),
        drift: rand(-0.18, 0.18),
        scale,
        alpha: rand(0.2, 0.43),
        tint: pick(ASTEROID_TINTS),
        pixelMap: makePixelRock(),
        meteor: isMeteor,
      });
    }
  }

  function makePixelRock() {
    if (Math.random() < 0.5) {
      return [
        [1, 1, 0],
        [1, 1, 1],
        [0, 1, 1],
      ];
    }

    return [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 1, 1, 0],
    ];
  }

  function wrapPosition(obj, pad) {
    if (obj.x < -pad) obj.x = width + pad;
    if (obj.x > width + pad) obj.x = -pad;
    if (obj.y < -pad) obj.y = height + pad;
    if (obj.y > height + pad) obj.y = -pad;
  }

  function drawNebulaBase() {
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, 'rgba(10, 18, 36, 0.3)');
    g.addColorStop(0.48, 'rgba(7, 13, 27, 0.14)');
    g.addColorStop(1, 'rgba(3, 8, 18, 0.45)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    const halo = ctx.createRadialGradient(width * 0.5, height * 0.46, 0, width * 0.5, height * 0.46, Math.min(width, height) * 0.62);
    halo.addColorStop(0, 'rgba(82, 120, 198, 0.06)');
    halo.addColorStop(1, 'rgba(82, 120, 198, 0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, width, height);
  }

  function drawStarLayer(stars, time, parallax) {
    for (let i = 0; i < stars.length; i += 1) {
      const s = stars[i];
      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
      const alpha = s.alpha * (0.8 + twinkle * 0.24);

      const px = Math.round(s.x + pointer.x * parallax);
      const py = Math.round(s.y + pointer.y * parallax);

      ctx.fillStyle = rgba(s.tint, alpha);
      ctx.fillRect(px, py, s.size, s.size);

      if (s.size > 1 && alpha > 0.24) {
        ctx.fillStyle = `rgba(216, 230, 255, ${alpha * 0.28})`;
        ctx.fillRect(px - 1, py, 1, s.size);
        ctx.fillRect(px + s.size, py, 1, s.size);
      }
    }
  }

  function drawAsteroids(dt, time) {
    for (let i = 0; i < asteroids.length; i += 1) {
      const rock = asteroids[i];
      rock.x += (rock.vx + Math.sin(time * 0.2 + i) * rock.drift) * dt;
      rock.y += rock.vy * dt;
      wrapPosition(rock, 32);

      const px = Math.round(rock.x + pointer.x * 0.009);
      const py = Math.round(rock.y + pointer.y * 0.009);
      const size = Math.max(1, Math.round(rock.scale * 2));

      if (rock.meteor && Math.random() > 0.54) {
        ctx.strokeStyle = `rgba(191, 210, 236, ${rock.alpha * 0.24})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px + 1, py + 1);
        ctx.lineTo(px + 10, py - 4);
        ctx.stroke();
      }

      for (let row = 0; row < rock.pixelMap.length; row += 1) {
        const cols = rock.pixelMap[row];
        for (let col = 0; col < cols.length; col += 1) {
          if (!cols[col]) continue;
          const shade = 0.82 + ((row + col) % 2) * 0.18;
          ctx.fillStyle = rgba(rock.tint, rock.alpha * shade);
          ctx.fillRect(px + col * size, py + row * size, size, size);
        }
      }
    }
  }

  function updateNodes(dt) {
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      wrapPosition(n, 24);
    }
  }

  function drawNodeConnections() {
    ctx.lineWidth = 1;

    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      const ax = a.x + pointer.x * 0.016;
      const ay = a.y + pointer.y * 0.016;

      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const bx = b.x + pointer.x * 0.016;
        const by = b.y + pointer.y * 0.016;

        const dx = ax - bx;
        const dy = ay - by;
        const distSq = dx * dx + dy * dy;
        if (distSq > LINK_DISTANCE_SQ) continue;

        const ratio = 1 - distSq / LINK_DISTANCE_SQ;
        const alpha = 0.04 + ratio * 0.18;
        ctx.strokeStyle = `rgba(144, 177, 238, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }
  }

  function drawNodes(time) {
    ctx.shadowBlur = 13;
    ctx.shadowColor = 'rgba(152, 178, 255, 0.4)';

    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];
      const pulse = 0.7 + Math.sin(time * 1.2 + i * 0.7) * 0.15;
      const x = n.x + pointer.x * 0.016;
      const y = n.y + pointer.y * 0.016;

      ctx.fillStyle = `rgba(157, 188, 255, ${n.glow * 0.2 * pulse})`;
      ctx.beginPath();
      ctx.arc(x, y, n.radius * 2.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(210, 224, 255, ${0.72 * pulse})`;
      ctx.fillRect(Math.round(x - 1), Math.round(y - 1), 2, 2);

      ctx.fillStyle = `rgba(136, 162, 234, ${0.72 * pulse})`;
      ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
    }

    ctx.shadowBlur = 0;
  }

  function drawCenterReadability() {
    const gradient = ctx.createRadialGradient(
      width * 0.5,
      height * 0.48,
      Math.min(width, height) * 0.15,
      width * 0.5,
      height * 0.48,
      Math.min(width, height) * 0.58,
    );
    gradient.addColorStop(0, 'rgba(7, 14, 28, 0.015)');
    gradient.addColorStop(1, 'rgba(3, 8, 17, 0.16)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function updatePointer(dt) {
    const smooth = 1 - Math.exp(-dt * 5.5);
    pointer.x += (pointer.tx - pointer.x) * smooth;
    pointer.y += (pointer.ty - pointer.y) * smooth;
  }

  function drawPointerGlow() {
    if (!pointer.active) return;

    const x = width * 0.5 + pointer.x * 0.03;
    const y = height * 0.5 + pointer.y * 0.03;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 170);
    gradient.addColorStop(0, 'rgba(86, 124, 210, 0.05)');
    gradient.addColorStop(1, 'rgba(86, 124, 210, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 170, 0, Math.PI * 2);
    ctx.fill();
  }

  function animate(time) {
    if (!running) return;

    if (!lastTime) lastTime = time;
    const rawDt = (time - lastTime) / 1000;
    const dt = Math.min(rawDt, 1 / 30);
    lastTime = time;
    const seconds = time * 0.001;

    ctx.clearRect(0, 0, width, height);

    updatePointer(dt);
    drawNebulaBase();
    drawStarLayer(farStars, seconds, 0.004);
    drawAsteroids(dt, seconds);
    drawStarLayer(nearStars, seconds, 0.01);
    updateNodes(dt);
    drawNodeConnections();
    drawNodes(seconds);
    drawPointerGlow();
    drawCenterReadability();

    rafId = requestAnimationFrame(animate);
  }

  function onVisibility() {
    if (document.hidden) {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      return;
    }

    if (!running) {
      running = true;
      lastTime = 0;
      rafId = requestAnimationFrame(animate);
    }
  }

  function onPointerMove(event) {
    pointer.tx = event.clientX - width * 0.5;
    pointer.ty = event.clientY - height * 0.5;
    pointer.active = true;
  }

  function onPointerLeave() {
    pointer.active = false;
    pointer.tx = 0;
    pointer.ty = 0;
  }

  window.addEventListener('resize', resize, {passive: true});
  document.addEventListener('visibilitychange', onVisibility, {passive: true});
  canvas.addEventListener('pointermove', onPointerMove, {passive: true});
  canvas.addEventListener('pointerleave', onPointerLeave, {passive: true});

  resize();
  rafId = requestAnimationFrame(animate);
})();

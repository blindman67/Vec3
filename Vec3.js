class Vec3 { // home spun Vector3
    x; y; z;
    static cross(a, b, res = V3()) { res.x = a.y * b.z - a.z * b.y; res.y = a.z * b.x - a.x * b.z; res.z = a.x * b.y - a.y * b.x; return res }
    static dot(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z }
    static setMat(mat, aX, aY, aZ, p) {  // mat is type THREE.Matrix4
        const e = mat.elements;
        e[0]  = aX.x; e[1]  = aX.y; e[2]  = aX.z;
        e[4]  = aY.x; e[5]  = aY.y; e[6]  = aY.z;
        e[8]  = aZ.x; e[9]  = aZ.y; e[10] = aZ.z;
        e[12] =  p.x; e[13] =  p.y; e[14] = p.z;
        return mat;
    }
    static isNaN(v) { return isNaN(v.x) || isNaN(v.y) || isNaN(v.z) }
    static COLORS = {};
    static {
        Vec3.COLORS.RED     = new Vec3(1, 0, 0);
        Vec3.COLORS.YELLOW  = new Vec3(1, 1, 0);
        Vec3.COLORS.GREEN   = new Vec3(0, 0.75, 0);
        Vec3.COLORS.CYAN    = new Vec3(0, 1, 1);
        Vec3.COLORS.BLUE    = new Vec3(0, 0, 1);
        Vec3.COLORS.MAGENTA = new Vec3(1, 0, 1);
        Vec3.COLORS.BLACK   = new Vec3(0, 0, 0);
        Vec3.COLORS.GRAY    = new Vec3(0.5, 0.5, 0.5);
        Vec3.COLORS.WHITE   = new Vec3(1, 1, 1);
        Vec3.UP     = new Vec3(0,  1, 0);
        Vec3.DOWN   = new Vec3(0, -1, 0);
        Vec3.EAST   = Vec3.RIGHT    = new Vec3( 1, 0, 0);
        Vec3.WEST   = Vec3.LEFT     = new Vec3(-1, 0, 0);
        Vec3.NORTH  = Vec3.FORWARD  = new Vec3( 0, 0,-1);
        Vec3.SOUTH  = Vec3.BACKWARD = new Vec3( 0, 0, 1);
        Vec3.ZERO   = new Vec3( 0, 0, 0);        
    };
    constructor(x, y, z) { this.x = x; this.y = y; this.z = z }
    set(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this }
    setX(x) { this.x = x; return this }
    setY(y) { this.y = y; return this }
    setZ(z) { this.z = z; return this }
    setXY(x, y) { this.x = x; this.y = y; return this }
    setXZ(x, z) { this.x = x; this.z = z; return this }
    setYZ(y, z) { this.y = y; this.z = z; return this }
    setXYZ(x, y, z) { this.x = x; this.y = y; this.z = z; return this }
    setAE(a, e) { const ce = Math.cos(e); this.x = Math.sin(a) * ce; this.y = -Math.sin(e); this.z = Math.cos(a) * ce; return this } // (a)zimuth, (e)levation. North along z on the x,z plane. y axis is Up
    setAED(a, e, d) { const ce = Math.cos(e) * d; this.x = Math.sin(a) * ce; this.y = -Math.sin(e) * d; this.z = Math.cos(a) * ce; return this } // (a)zimuth, (e)levation, (d)istance. North along z on the x,z plane. y axis is Up
    setAE_V(v) { const ce = Math.cos(v.y); this.x = Math.sin(v.x) * ce; this.y = -Math.sin(v.y); this.z = Math.cos(v.x) * ce; return this } // V as vector holding x: azimuth, y: elevation.
    setAED_V(v) { const ce = Math.cos(v.y) * v.z; this.x = Math.sin(v.x) * ce; this.y = -Math.sin(v.y) * v.z; this.z = Math.cos(v.x) * ce; return this } // V as vector holding x: azimuth, y: elevation, z: distance.
    zero() { this.x = this.y = this.z = 0; return this }
    equals(v, epsolon = 0.0001) { return (this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2 < epsolon }
    add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this }
    addX(x) { this.x += x; return this }
    addY(y) { this.y += y; return this }
    addZ(z) { this.z += z; return this }
    addXY(x, y) { this.x += x; this.y += y; return this }
    addXZ(x, z) { this.x += x; this.z += z; return this }
    addYZ(y, z) { this.y += y; this.z += z; return this }
    addXYZ(x, y, z) { this.x += x; this.y += y; this.z += z; return this }
    addXYZScaled(x, y, z, s) { this.x += x * s; this.y += y * s; this.z += z * s; return this }
    addScaled(v, s) { this.x += v.x * s; this.y += v.y * s; this.z += v.z * s; return this }
    addAED(a, e, d) { const ce = Math.cos(e) * d; this.x += Math.sin(a) * ce; this.y += -Math.sin(e) * d; this.z += Math.cos(a) * ce; return this }
    addAE_V(v) { const ce = Math.cos(v.y); this.x += Math.sin(v.x) * ce; this.y += -Math.sin(v.y); this.z += Math.cos(v.x) * ce; return this }
    addAED_V(v) { const ce = Math.cos(v.y) * v.z; this.x += Math.sin(v.x) * ce; this.y += -Math.sin(v.y) * v.z; this.z += Math.cos(v.x) * ce; return this }
    sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this }
    mid(v) { this.x = (this.x + v.x) * 0.5; this.y = (this.y + v.y) * 0.5; this.z = (this.z + v.z) * 0.5; return this }
    scale(s) { this.x *= s; this.y *= s; this.z *= s; return this }
    reverse() { this.x = -this.x; this.y = -this.y; this.z = -this.z; return this }
    min(v) { this.x = Math.min(this.x, v.x); this.y = Math.min(this.y, v.y); this.z = Math.min(this.z, v.z); return this }
    max(v) { this.x = Math.max(this.x, v.x); this.y = Math.max(this.y, v.y); this.z = Math.max(this.z, v.z); return this }
    lenSqr() { return this.x * this.x + this.y * this.y + this.z * this.z }
    len() { return (this.x * this.x + this.y * this.y + this.z * this.z) ** 0.5 }
    dist(v) { return ((this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2) ** 0.5 }
    distSqr(v) { return (this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2 }
    sqr() { this.x **= 2; this.y **= 2; this.z **= 2; return this }
    sqrt() { this.x **= 0.5; this.y **= 0.5; this.z **= 0.5; return this }
    round() { this.x = Math.round(this.x); this.y = Math.round(this.y); this.z = Math.round(this.z); return this; }
    grow(g) { const l = (this.x * this.x + this.y * this.y + this.z * this.z) ** 0.5, s = (l + g) / l; this.x *= s; this.y *= s;this.z *= s; return this }
    resize(size) { const s = size / ((this.x * this.x + this.y * this.y + this.z * this.z) ** 0.5); this.x *= s; this.y *= s; this.z *= s; return this }
    normalize() { const l = 1 / ((this.x * this.x + this.y * this.y + this.z * this.z) ** 0.5); this.x *= l; this.y *= l; this.z *= l; return this }
    toAED() { const d = (this.x * this.x + this.y * this.y + this.z * this.z) ** 0.5; this.x = Math.atan2(this.x, this.z); this.y = (Math.PI * -0.5) + Math.acos(Math.max(-1, Math.min(1, this.y / d))); this.z = d; return this }
    cross(a, b) { const x = a.y * b.z - a.z * b.y; const y = a.z * b.x - a.x * b.z; const z = a.x * b.y - a.y * b.x; this.x = x; this.y = y; this.z = z; return this } 
    dot(b) { return this.x * b.x + this.y * b.y + this.z * b.z; }
    unitDot(b) { return (this.x * b.x + this.y * b.y + this.z * b.z) / (((this.x **2 + this.y **2 + this.z **2) **0.5) * ((b.x **2 + b.y **2 + b.z **2) **0.5)) }
    uClampDot(b) { return Math.max(-1, Math.min(1, (this.x * b.x + this.y * b.y + this.z * b.z) / (((this.x **2 + this.y **2 + this.z **2) **0.5) * ((b.x **2 + b.y **2 + b.z **2) **0.5)))) }
    lerp(a, b, t) { this.x = (b.x - a.x) * t + a.x; this.y = (b.y - a.y) * t + a.y; this.z = (b.z - a.z) * t + a.z; return this }
    rndXYZ(x, X, y, Y, z, Z) { this.x = (X - x) * Math.random() + x; this.y = (Y - y) * Math.random() + y; this.z = (Z - z) * Math.random() + z; return this }
    rnd(m, M) { const r = M - m; this.x = r * Math.random() + m; this.y = r * Math.random() + m; this.z = r * Math.random() + m; return this }    
    axisXFromMat(mat) { const e = mat.elements; this.x = e[0];  this.y = e[1];  this.z = e[2];  return this }
    axisYFromMat(mat) { const e = mat.elements; this.x = e[4];  this.y = e[5];  this.z = e[6];  return this }
    axisZFromMat(mat) { const e = mat.elements; this.x = e[8];  this.y = e[9];  this.z = e[10]; return this }
    posFromMat(mat)   { const e = mat.elements; this.x = e[12]; this.y = e[13]; this.z = e[14]; return this }
    setMatAxisX(mat)  { const e = mat.elements; e[0] =  this.x; e[1] =  this.y; e[2] =  this.z; return this }
    setMatAxisY(mat)  { const e = mat.elements; e[4] =  this.x; e[5] =  this.y; e[6] =  this.z; return this }
    setMatAxisZ(mat)  { const e = mat.elements; e[8] =  this.x; e[9] =  this.y; e[10] = this.z; return this }
    setMatPos(mat)    { const e = mat.elements; e[12] = this.x; e[13] = this.y; e[14] = this.z; return this }
    fromCol(col)      { this.x = (col >> 16) & 0xFF; this.y = (col >> 8) & 0xFF; this.z = col & 0xFF; return this }
    fromColNorm(col)  { this.x = ((col >> 16) & 0xFF) * Maths.INV_BYTE; this.y = ((col >> 8) & 0xFF) * Maths.INV_BYTE; this.z = (col & 0xFF) * Maths.INV_BYTE; return this }
    toAED() { const d = (this.x * this.x + this.y * this.y + this.z * this.z) ** 0.5; this.x = Math.atan2(this.x, this.z); this.y = (Math.PI * -0.5) + Math.acos(Math.max(-1, Math.min(1, this.y / d))); this.z = d; return this }
    toString() { return "V3: {x: " + this.x.toFixed(3) + ", y: " + this.y.toFixed(3) + ", z: " + this.z.toFixed(3) + "}" }
    toArray() { return [this.x, this.y, this.z] }
};
const V3 = (x, y, z) => (x !== undefined && y === undefined && z === undefined) ? new Vec3(x.x, x.y, x.z) : ((x === undefined && y === undefined && z === undefined) ? new Vec3(0, 0, 0) : new Vec3(x, y, z));
const TV3 = window.THREE ? (x, y, z) => new THREE.Vector3(x, y, z) : V3;
export {Vec3, V3, TV3}
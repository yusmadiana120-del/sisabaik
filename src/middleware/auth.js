import { verifikasiToken } from "../lib/token.js";
import { cariId, kePengguna } from "../repositories/pengguna.js";
import { HttpError } from "../lib/api.js";

export async function wajibLogin(req, res, next) {
  res.set("WWW-Authenticate", "Bearer");
  const header = req.get("authorization") ?? "";
  if (!header) {
    throw new HttpError(
      401,
      "AUTH_REQUIRED",
      "Silakan login terlebih dahulu."
    );
  }
  const cocok =
    header.length <= 2048 &&
    /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/.exec(
      header
    );
  if (!cocok) {
    throw new HttpError(401, "TOKEN_INVALID", "Token tidak valid.");
  }
  const p = verifikasiToken(cocok[1]);
  const row = await cariId(p.sub);
  if (
    !row ||
    !row.aktif ||
    !row.kata_sandi_hash ||
    row.versi_token !== p.v
  ) {
    throw new HttpError(
      401,
      "SESSION_REVOKED",
      "Sesi tidak berlaku. Silakan login lagi."
    );
  }
  req.pengguna = kePengguna(row);
  res.removeHeader("WWW-Authenticate");
  next();
}

export function wajibPeran(...peran) {
  return (req, res, next) => {
    if (!req.pengguna || !peran.includes(req.pengguna.peran)) {
      throw new HttpError(
        403,
        "ROLE_FORBIDDEN",
        "Peran Anda tidak diizinkan."
      );
    }
    next();
  };
}

export function wajibPenyediaTerverifikasi(req, res, next) {
  if (
    !req.pengguna.penyediaId ||
    req.pengguna.statusVerifikasi !== "terverifikasi"
  ) {
    throw new HttpError(
      403,
      "PROVIDER_NOT_VERIFIED",
      "Profil penyedia belum terverifikasi."
    );
  }
  next();
}

import { rateLimit } from "express-rate-limit";

export const batasAuth = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler(req, res) {
    res.status(429).json({
      success: false,
      error: {
        code: "AUTH_RATE_LIMIT",
        message: "Terlalu banyak percobaan. Tunggu sesuai Retry-After.",
      },
    });
  },
});

export const batasRegistrasi = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler(req, res) {
    res.status(429).json({
      success: false,
      error: {
        code: "REGISTRATION_RATE_LIMIT",
        message:
          "Terlalu banyak pendaftaran. Silakan coba kembali sesuai Retry-After.",
      },
    });
  },
});

import * as service from "../services/auth.js";
import {
  registrasiValid,
  registrasiPenyediaValid,
  loginValid,
} from "../lib/input-auth.js";
import { cabutToken } from "../repositories/pengguna.js";

export async function registrasi(req, res) {
  const data = await service.registrasi(registrasiValid(req.body));
  return res.status(201).json({ success: true, data });
}

export async function login(req, res) {
  const data = await service.login(loginValid(req.body));
  return res.json({ success: true, data });
}

export async function registrasiPenyedia(req, res) {
  const data = await service.registrasiPenyedia(
    registrasiPenyediaValid(req.body)
  );
  return res.status(201).json({ success: true, data });
}

export function saya(req, res) {
  return res.json({ success: true, data: req.pengguna });
}

export async function logout(req, res) {
  await cabutToken(req.pengguna.id);
  return res.status(204).end();
}

import { Router } from "express";
import * as c from "../controllers/auth.js";

const router = Router();
router.post("/registrasi", batasRegistrasi, c.registrasi);
router.post("/registrasi-penyedia", batasRegistrasi, c.registrasiPenyedia);
router.post("/login", batasAuth, c.login);
router.get("/saya", wajibLogin, c.saya);
router.post("/logout", wajibLogin, c.logout);
export default router;

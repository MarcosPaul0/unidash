FROM node:24.12.0 as builder

ENV NODE_ENV build

WORKDIR /usr/app

# Copiar package.json como root primeiro
COPY package*.json ./

# Mudar ownership e então mudar para user node
RUN chown -R node:node /usr/app

USER node

# Agora instalar dependências
RUN npm ci

# Copiar o resto do código
COPY --chown=node:node . .

# Build
RUN npx prisma generate \
    && npm run build \
    && npm prune --omit=dev

# ---

FROM node:21.5.0

ENV NODE_ENV production

WORKDIR /usr/app

# Copiar arquivos do builder
COPY --from=builder --chown=node:node /usr/app/.env ./
COPY --from=builder --chown=node:node /usr/app/package*.json ./
COPY --from=builder --chown=node:node /usr/app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /usr/app/dist/ ./dist/
COPY --from=builder --chown=node:node /usr/app/common/ ./common/
COPY --from=builder --chown=node:node /usr/app/prisma/ ./prisma/

# Mudar para user node
USER node

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/infra/main.js"]
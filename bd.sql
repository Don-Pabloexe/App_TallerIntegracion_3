-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-09-2023 a las 23:44:10
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesor_pedagogico`
--

CREATE TABLE `asesor_pedagogico` (
  `id` int(10) NOT NULL,
  `nombre` int(20) NOT NULL,
  `apellido` int(20) NOT NULL,
  `correo` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `ID` int(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `correo` varchar(20) NOT NULL,
  `departamento` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta_satisfaccion`
--

CREATE TABLE `encuesta_satisfaccion` (
  `id` int(10) NOT NULL,
  `id_solicitud` int(10) NOT NULL,
  `puntuacion` int(2) NOT NULL,
  `comentarios` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instancia_formacion`
--

CREATE TABLE `instancia_formacion` (
  `id` int(10) NOT NULL,
  `titulo` varchar(25) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `fecha_hora` datetime(6) NOT NULL,
  `lugar` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `id` int(10) NOT NULL,
  `id_docente` int(10) NOT NULL,
  `contenido` varchar(50) NOT NULL,
  `fecha_hora` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participacion_formacion`
--

CREATE TABLE `participacion_formacion` (
  `id` int(10) NOT NULL,
  `id_docente` int(10) NOT NULL,
  `id_instancia_formacion` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recurso`
--

CREATE TABLE `recurso` (
  `id` int(10) NOT NULL,
  `titulo` varchar(40) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_asesoria`
--

CREATE TABLE `solicitud_asesoria` (
  `id` int(10) NOT NULL,
  `id_docente` int(10) NOT NULL,
  `id_asesor` int(10) NOT NULL,
  `fecha_hora_solicitud` datetime(6) NOT NULL,
  `modalidad` varchar(10) NOT NULL,
  `descripcion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asesor_pedagogico`
--
ALTER TABLE `asesor_pedagogico`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `encuesta_satisfaccion`
--
ALTER TABLE `encuesta_satisfaccion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `instancia_formacion`
--
ALTER TABLE `instancia_formacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `participacion_formacion`
--
ALTER TABLE `participacion_formacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recurso`
--
ALTER TABLE `recurso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitud_asesoria`
--
ALTER TABLE `solicitud_asesoria`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

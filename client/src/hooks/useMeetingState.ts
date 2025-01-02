import { useState, useEffect } from "react";
import axios from "axios";
// import {useAuth} from "../contexts/AuthContext"

interface Participant {
  id: string;
  name: string;
  isHost: boolean;
}

export function useMeetingState() {}

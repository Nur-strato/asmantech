cat << 'EOF' > src/app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";

export interface Lead {
    id: string;
    serviceId: string;
    serviceName: string;
    clientName: string;
    aboutDetails?: string;
    countryCode: string;
    phoneNumber: string;
    fullPhone: string;
    contactPreference: "message" | "call";
    createdAt: string;
    status: "new" | "in_progress" | "closed";
}

let leadsStorage: Lead[] = [
    {
        id: "lead_1729831000000",
        serviceId: "web-dev",
        serviceName: "Website Development",
        clientName: "Азамат Бекбоев",
        aboutDetails: "Нужен корпоративный портал и интеграция с CRM",
        countryCode: "+996",
        phoneNumber: "(700) 123-456",
        fullPhone: "+996 700123456",
        contactPreference: "message",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: "new",
    },
    {
        id: "lead_1729828000000",
        serviceId: "ai-chatbots",
        serviceName: "AI Chatbots",
        clientName: "ОсОО «Азия Трейд»",
        aboutDetails: "Умный бот для поддержки клиентов в WhatsApp",
        countryCode: "+996",
        phoneNumber: "(555) 987-654",
        fullPhone: "+996 555987654",
        contactPreference: "call",
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        status: "in_progress",
    },
];

// Получение списка всех заявок (только с сессией админа)
export async function GET(req: NextRequest) {
    if (!verifyAdminSession(req)) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: true, leads: leadsStorage });
}

// Создание новой заявки с формы (публичный эндпоинт)
export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.clientName?.trim() || !body.phoneNumber?.trim()) {
            return NextResponse.json(
                { success: false, error: "Обязательные поля не заполнены" },
                { status: 400 }
            );
        }

        const cleanDigits = body.phoneNumber.replace(/\D/g, "");
        const cleanCountry = body.countryCode.replace(/\D/g, "");

        const newLead: Lead = {
            id: `lead_${Date.now()}`,
            serviceId: body.serviceId || "other",
            serviceName: body.serviceName || "Индивидуальная задача",
            clientName: body.clientName.trim(),
            aboutDetails: body.aboutDetails?.trim() || "",
            countryCode: body.countryCode || "+996",
            phoneNumber: body.phoneNumber.trim(),
            fullPhone: `+${cleanCountry}${cleanDigits}`,
            contactPreference: body.contactPreference || "message",
            createdAt: new Date().toISOString(),
            status: "new",
        };

        leadsStorage.unshift(newLead);
        return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: "Ошибка сервера" },
            { status: 500 }
        );
    }
}

// Обновление статуса заявки (только с сессией админа)
export async function PATCH(req: NextRequest) {
    if (!verifyAdminSession(req)) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, status } = await req.json();
        const lead = leadsStorage.find((l) => l.id === id);

        if (!lead) {
            return NextResponse.json({ success: false, error: "Заявка не найдена" }, { status: 404 });
        }

        lead.status = status;
        return NextResponse.json({ success: true, lead });
    } catch {
        return NextResponse.json({ success: false, error: "Ошибка при обновлении" }, { status: 500 });
    }
}

// Удаление заявки (только с сессией админа)
export async function DELETE(req: NextRequest) {
    if (!verifyAdminSession(req)) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "ID не передан" }, { status: 400 });
        }

        leadsStorage = leadsStorage.filter((l) => l.id !== id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false, error: "Ошибка при удалении" }, { status: 500 });
    }
}
EOF